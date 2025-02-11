from bs4 import BeautifulSoup
import requests
import json
from organizations.models import Organization

def get_club_links(url): #takes in wusa club page url and returns a list of links to all clubs on the page.
    page_to_scrape=requests.get(url)
    soup = BeautifulSoup(page_to_scrape.text, 'html.parser')

    wusa_clubs = soup.findAll("div", attrs={'class':"card card-body mb-3 rounded-3"})

    club_links = []
    for club in wusa_clubs:
        link_temp = club.find("a")
        club_links.append(link_temp.get('href'))
    return club_links

def get_club_info(club_url): #takes in a specific club url.
    
    page_to_scrape=requests.get(f'https://clubs.wusa.ca{club_url}')
    page_to_scrape2 = requests.get(f'https://clubs.wusa.ca{club_url}/constitution')

    overview=BeautifulSoup(page_to_scrape.text, 'html.parser')
    constitution = BeautifulSoup(page_to_scrape2.text, 'html.parser') # don't forget this

    club_overviews = overview.findAll("div", attrs={'id':"full-text"})

    club_name = overview.find('h5', attrs={'class':"club-name-header text-center text-md-start"})

    club_membership = constitution.find('section', attrs={'id':"membership_structure"})
    club_membership_layer2 = club_membership.find('section', attrs={'id':"membership_structure"})
    club_membership_type = club_membership_layer2.find('div', attrs={'class':"alert alert-secondary"}) #fix this

    
    
    
    club_overview_temp = ""
    for page in club_overviews:
        club_overview = page.findAll("p")
        club_overview_temp2 = "" 
        
        for txt in club_overview:
            club_overview_temp2 += txt.text
    club_overview_temp += club_overview_temp2
    orgo = Organization(org_name=club_name.text, org_type="Club", overview=club_overview_temp, star_rating=0, ranking_num=0)
    


club_numbers = []
club_data = []
for i in range(20):
    get_club_links(f'https://clubs.wusa.ca/club_listings?page={i+1}')
    for k in range(len(club_numbers[i])):
        get_club_info(club_numbers[i][k])





def get_designTeam_info(url):
    page_to_scrape=requests.get(url)
    soup = BeautifulSoup(page_to_scrape.text, 'html.parser')

    all_design_info=[]


    all_teams = soup.findAll('details', attrs={'class':"uw-details"})
    for team in all_teams:
        
        design_info = {
            'name': "",
            "img_url": "",
            "description": "",
            "links": [],
        }
        name_temp = team.find('summary', attrs={'class':"details__summary"})
        design_info['name'] = name_temp.find('h2').text

        
        img_url_temp = team.find('img')
        if img_url_temp != None:
            design_info['img_url'] = img_url_temp.get('src')

        description_temp = team.find('p')
        description_to_append = ""
        for p in description_temp:
            description_to_append += p.text
        design_info['description'] = description_to_append

        links_temp = team.findAll('li')
        for li in links_temp:
            temp = li.find('a')
            if temp != None:
                design_info['links'].append(temp.get('href'))
        

        all_design_info.append(design_info)
            

    return all_design_info

# design_team_data = get_designTeam_info('https://uwaterloo.ca/sedra-student-design-centre/directory-teams')

# with open('design_team_data.json', 'w') as json_file:
#     json.dump(design_team_data, json_file, indent=4)
