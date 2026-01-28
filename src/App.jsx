import { useState, useEffect, useRef } from 'react';
import Hls from 'hls.js';

// SVG Icon Components
const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="6 3 20 12 6 21 6 3"></polygon>
  </svg>
);

const BookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
  </svg>
);

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const HeartIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
  </svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
  </svg>
);

const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 3h6v6"></path>
    <path d="M10 14 21 3"></path>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
  </svg>
);

const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6"></path>
  </svg>
);

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" x2="20" y1="12" y2="12"></line>
    <line x1="4" x2="20" y1="6" y2="6"></line>
    <line x1="4" x2="20" y1="18" y2="18"></line>
  </svg>
);

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18"></path>
    <path d="m6 6 12 12"></path>
  </svg>
);

const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6"></path>
  </svg>
);

const TankIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="14" width="20" height="6" rx="2"></rect>
    <path d="M4 14v-3a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3"></path>
    <path d="M14 9V6a2 2 0 0 1 2-2h2"></path>
    <circle cx="6" cy="17" r="1"></circle>
    <circle cx="10" cy="17" r="1"></circle>
    <circle cx="14" cy="17" r="1"></circle>
    <circle cx="18" cy="17" r="1"></circle>
  </svg>
);

const FolderIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"></path>
  </svg>
);

const UserIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="5"></circle>
    <path d="M20 21a8 8 0 0 0-16 0"></path>
  </svg>
);

const CloseIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18"></path>
    <path d="m6 6 12 12"></path>
  </svg>
);

const StarIcon = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

// Battalion Organization Data
const battalionData = {
  id: 'bn-hq',
  name: '2-70 Armor "Iron Tigers"',
  type: 'battalion',
  callsign: 'IRON TIGER 6',
  children: [
    {
      id: 'bn-staff',
      name: 'Battalion Staff',
      type: 'staff',
      children: [
        {
          id: 'bn-cdr',
          name: 'LTC William "Wild Bill" Gruner',
          type: 'person',
          role: 'Battalion Commander',
          callsign: 'Iron Tiger 6',
          age: 44,
          hometown: 'Fort Knox, Kentucky',
          currentLocation: 'Retired - Lexington, KY',
          career: 'Retired Colonel, now teaches military history at UK',
          bio: 'A West Point graduate, Class of 1969. Served in Vietnam as a young lieutenant. Led 2-70 Armor through every engagement of Desert Storm, present at the front during the Battle of Medina Ridge. Known for his calm demeanor under fire and genuine care for his soldiers. After retirement, dedicated himself to veterans advocacy.',
          decorations: ['Bronze Star with V', 'Legion of Merit', 'Purple Heart']
        },
        {
          id: 'bn-xo',
          name: 'MAJ Richard "Rick" Patterson',
          type: 'person',
          role: 'Executive Officer',
          callsign: 'Iron Tiger 5',
          age: 38,
          hometown: 'Dayton, Ohio',
          currentLocation: 'Deceased - 2019',
          career: 'Retired LTC, passed from Gulf War-related cancer',
          bio: 'The organizational backbone of the battalion. Rick kept the supplies flowing and the maintenance running when everything seemed impossible. A graduate of Ohio State ROTC who loved the Army and his family equally. Developed pancreatic cancer in 2018, believed linked to toxic exposures during the war.',
          decorations: ['Bronze Star', 'Meritorious Service Medal']
        },
        {
          id: 'bn-csm',
          name: 'CSM Robert "Top" Washington',
          type: 'person',
          role: 'Command Sergeant Major',
          callsign: 'Iron Tiger 7',
          age: 46,
          hometown: 'Birmingham, Alabama',
          currentLocation: 'Retired - Atlanta, GA',
          career: 'Retired CSM, community organizer and mentor',
          bio: 'Enlisted in 1965, served three tours in Vietnam. The moral compass of the battalion and protector of enlisted soldiers. His booming voice could be heard across the motor pool, but he was known for quiet moments of counsel with young soldiers struggling far from home. Runs a mentorship program for at-risk youth in Atlanta.',
          decorations: ['Bronze Star with V', 'Silver Star', 'Three Purple Hearts']
        }
      ]
    },
    {
      id: 'hhc',
      name: 'HHC - Headquarters Company',
      type: 'company',
      callsign: 'IRON TIGER',
      children: [
        {
          id: 'hhc-cdr',
          name: 'CPT Sarah "Sally" Mitchell',
          type: 'person',
          role: 'HHC Commander',
          callsign: 'Iron Tiger 3',
          age: 29,
          hometown: 'Portland, Oregon',
          currentLocation: 'Washington, D.C.',
          career: 'Retired Major, now works at the Pentagon',
          bio: 'One of the few female officers deployed with a combat unit in Desert Storm. Managed the complex logistics of keeping 58 tanks operational in harsh desert conditions. Faced skepticism from some but earned universal respect through competence and dedication. Later advocated for expanded roles for women in combat units.',
          decorations: ['Bronze Star', 'Army Commendation Medal']
        }
      ]
    },
    {
      id: 'a-co',
      name: 'A Company "Assassin"',
      type: 'company',
      callsign: 'ASSASSIN',
      children: [
        {
          id: 'a-co-hq',
          name: 'Company Headquarters',
          type: 'platoon',
          children: [
            {
              id: 'a-co-66',
              name: 'A-66 "Apache Six"',
              type: 'tank',
              children: [
                {
                  id: 'a-co-cdr',
                  name: 'CPT James "Jim" Hartley',
                  type: 'person',
                  role: 'Company Commander / Tank Commander',
                  callsign: 'Assassin 6',
                  age: 31,
                  hometown: 'San Antonio, Texas',
                  currentLocation: 'Fort Hood, TX (Retired)',
                  career: 'Retired Lieutenant Colonel, defense contractor',
                  bio: 'A natural tanker from a military family—his father served in Vietnam, grandfather in WWII. Jim led Assassin Company through Al Busayyah and Medina Ridge, personally destroying four T-72s. Known for aggressive tactics balanced with genuine concern for his crews. His company suffered zero KIA.',
                  decorations: ['Silver Star', 'Bronze Star with V']
                },
                {
                  id: 'a66-gnr',
                  name: 'SGT Michael "Mikey" Torres',
                  type: 'person',
                  role: 'Gunner',
                  callsign: 'Assassin 6 Gunner',
                  age: 24,
                  hometown: 'El Paso, Texas',
                  currentLocation: 'El Paso, TX',
                  career: 'High school teacher and football coach',
                  bio: 'Grew up on the border, joined the Army to pay for college. An exceptional gunner with near-perfect qualification scores. Credited with six confirmed tank kills during the ground war. Now teaches history and coaches football at his old high school, occasionally speaking to students about his service.',
                  decorations: ['Army Commendation Medal with V']
                },
                {
                  id: 'a66-ldr',
                  name: 'SPC David "Dave" Kowalski',
                  type: 'person',
                  role: 'Loader',
                  callsign: 'Assassin 6 Loader',
                  age: 20,
                  hometown: 'Chicago, Illinois',
                  currentLocation: 'Chicago, IL',
                  career: 'Chicago Fire Department, 25 years',
                  bio: 'Joined straight out of high school from the South Side. Fast hands made him an exceptional loader—could maintain 8-second reload cycles even in sustained combat. Came home and joined the fire department, saying he missed the brotherhood. Still meets up with his crew every five years.',
                  decorations: ['Army Commendation Medal']
                },
                {
                  id: 'a66-dvr',
                  name: 'PFC Roberto "Bobby" Sandoval',
                  type: 'person',
                  role: 'Driver',
                  callsign: 'Assassin 6 Driver',
                  age: 19,
                  hometown: 'Phoenix, Arizona',
                  currentLocation: 'Phoenix, AZ',
                  career: 'Auto mechanic, owns three shops',
                  bio: 'The youngest man in the company HQ, Bobby could make the M1A1 dance. Grew up working on cars with his father and uncle. Used his Army mechanical training and GI Bill to open his first auto shop in 1996. Now owns three locations and employs several veterans.',
                  decorations: ['Army Achievement Medal']
                }
              ]
            }
          ]
        },
        {
          id: 'a-1',
          name: '1st Platoon "Apache"',
          type: 'platoon',
          callsign: 'ASSASSIN 1',
          children: [
            {
              id: 'a-11',
              name: 'A-11 "Angry Apache"',
              type: 'tank',
              children: [
                {
                  id: 'a11-tc',
                  name: 'SFC Thomas "Tommy" O\'Brien',
                  type: 'person',
                  role: 'Platoon Sergeant / Tank Commander',
                  callsign: 'Assassin 1-1',
                  age: 34,
                  hometown: 'Boston, Massachusetts',
                  currentLocation: 'Retired - Cape Cod, MA',
                  career: 'Retired First Sergeant, fishing charter captain',
                  bio: 'A tough Irish kid from Southie who found his calling in tanks. Fifteen years of service by Desert Storm, the most experienced NCO in the platoon. His tank was always the first ready in the morning. Retired after 22 years and bought a fishing boat, taking veterans out for free charters.',
                  decorations: ['Bronze Star with V', 'Army Commendation Medal']
                },
                {
                  id: 'a11-gnr',
                  name: 'SGT William "Willie" Jackson',
                  type: 'person',
                  role: 'Gunner',
                  callsign: 'Assassin 1-1 Gunner',
                  age: 26,
                  hometown: 'Detroit, Michigan',
                  currentLocation: 'Detroit, MI',
                  career: 'UAW local president, Ford assembly plant',
                  bio: 'Enlisted to escape the economic collapse hitting Detroit in the 80s. A natural marksman who could hit targets others couldn\'t see. Returned home and got a job at Ford, eventually becoming a union leader. Advocates for veterans\' employment rights.',
                  decorations: ['Army Commendation Medal with V']
                },
                {
                  id: 'a11-ldr',
                  name: 'PFC Marcus "Marc" Williams',
                  type: 'person',
                  role: 'Loader',
                  callsign: 'Assassin 1-1 Loader',
                  age: 21,
                  hometown: 'Memphis, Tennessee',
                  currentLocation: 'Nashville, TN',
                  career: 'Music producer, Grammy-nominated',
                  bio: 'Joined the Army to see the world beyond Memphis. The crew\'s morale officer, always had a joke or a song. Used his GI Bill to study music production in Nashville. Has produced several country and gospel albums, nominated for a Grammy in 2018.',
                  decorations: ['Army Achievement Medal']
                },
                {
                  id: 'a11-dvr',
                  name: 'PVT James "Jimmy" Nguyen',
                  type: 'person',
                  role: 'Driver',
                  callsign: 'Assassin 1-1 Driver',
                  age: 19,
                  hometown: 'Houston, Texas',
                  currentLocation: 'Houston, TX',
                  career: 'Surgeon, MD Anderson Cancer Center',
                  bio: 'His parents fled Vietnam in 1975. Jimmy was determined to serve the country that gave his family refuge. An exceptional student who used the GI Bill to attend medical school. Now an oncologist specializing in cancers affecting Gulf War veterans.',
                  decorations: ['Army Achievement Medal']
                }
              ]
            },
            {
              id: 'a-12',
              name: 'A-12 "Annihilator"',
              type: 'tank',
              children: [
                {
                  id: 'a12-tc',
                  name: 'SSG Frank "Frankie" Martinez',
                  type: 'person',
                  role: 'Tank Commander',
                  callsign: 'Assassin 1-2',
                  age: 28,
                  hometown: 'Albuquerque, New Mexico',
                  currentLocation: 'Albuquerque, NM',
                  career: 'State Police officer, now chief of detectives',
                  bio: 'Third-generation Army—grandfather fought in WWII, father in Korea. Cool under pressure, Frank\'s tank destroyed three Iraqi vehicles at Medina Ridge. Joined the state police after the Army and worked his way up to lead detective. Still mentors young soldiers at the local reserve unit.',
                  decorations: ['Bronze Star', 'Army Commendation Medal']
                },
                {
                  id: 'a12-gnr',
                  name: 'SGT Peter "Pete" Volkov',
                  type: 'person',
                  role: 'Gunner',
                  callsign: 'Assassin 1-2 Gunner',
                  age: 25,
                  hometown: 'Cleveland, Ohio',
                  currentLocation: 'Columbus, OH',
                  career: 'Civil engineer, Ohio DOT',
                  bio: 'Son of Ukrainian immigrants who came through Ellis Island. Pete\'s father worked in the steel mills until they closed. Sharp-eyed and steady-handed, he never missed a qualifying shot. Works for the state department of transportation, building bridges across Ohio.',
                  decorations: ['Army Commendation Medal']
                },
                {
                  id: 'a12-ldr',
                  name: 'SPC Anthony "Tony" Russo',
                  type: 'person',
                  role: 'Loader',
                  callsign: 'Assassin 1-2 Loader',
                  age: 22,
                  hometown: 'Brooklyn, New York',
                  currentLocation: 'Staten Island, NY',
                  career: 'FDNY, 30 years service',
                  bio: 'From a family of firefighters and cops in Brooklyn. Tony brought New York attitude to the desert—tough, loud, and fiercely loyal. Joined FDNY after the Army. Was on duty on 9/11, lost friends in the towers. Still serving, now a battalion chief.',
                  decorations: ['Army Commendation Medal']
                },
                {
                  id: 'a12-dvr',
                  name: 'PFC Kevin "Kev" Murphy',
                  type: 'person',
                  role: 'Driver',
                  callsign: 'Assassin 1-2 Driver',
                  age: 20,
                  hometown: 'Minneapolis, Minnesota',
                  currentLocation: 'Minneapolis, MN',
                  career: 'Lutheran pastor',
                  bio: 'A quiet farm kid from Minnesota who found himself in the desert. Kevin drove his tank through enemy fire without flinching, then wrote letters home about the beauty of the stars. Felt a calling after the war and became a minister. Provides counseling to veterans in his congregation.',
                  decorations: ['Army Achievement Medal']
                }
              ]
            },
            {
              id: 'a-13',
              name: 'A-13 "Avenger"',
              type: 'tank',
              children: [
                {
                  id: 'a13-tc',
                  name: 'SSG Charles "Chuck" Baker',
                  type: 'person',
                  role: 'Tank Commander',
                  callsign: 'Assassin 1-3',
                  age: 30,
                  hometown: 'Montgomery, Alabama',
                  currentLocation: 'Huntsville, AL',
                  career: 'NASA contractor, rocket propulsion engineer',
                  bio: 'Always fascinated by how things worked, Chuck could fix anything on the tank. Used his technical skills and GI Bill to earn an engineering degree. Now works on rocket engines at Marshall Space Flight Center. Says the M1A1 turbine was good preparation.',
                  decorations: ['Bronze Star', 'Army Commendation Medal']
                },
                {
                  id: 'a13-gnr',
                  name: 'SGT Raymond "Ray" Little Bear',
                  type: 'person',
                  role: 'Gunner',
                  callsign: 'Assassin 1-3 Gunner',
                  age: 27,
                  hometown: 'Pine Ridge Reservation, South Dakota',
                  currentLocation: 'Pine Ridge, SD',
                  career: 'Tribal council member, rancher',
                  bio: 'Oglala Lakota, following a tradition of warriors serving in the US military. Ray\'s grandfather was a code talker in WWII. An excellent gunner with eyes like a hawk. Returned home to the reservation, now serves on the tribal council and raises cattle. Teaches young people about both Lakota warrior traditions and modern military service.',
                  decorations: ['Army Commendation Medal with V']
                },
                {
                  id: 'a13-ldr',
                  name: 'SPC Daniel "Danny" Kim',
                  type: 'person',
                  role: 'Loader',
                  callsign: 'Assassin 1-3 Loader',
                  age: 21,
                  hometown: 'Los Angeles, California',
                  currentLocation: 'San Francisco, CA',
                  career: 'Tech executive, founded cybersecurity company',
                  bio: 'Son of Korean immigrants who ran a grocery store in Koreatown. Danny was studying computer science when he decided to serve first. The Army taught him discipline and teamwork. Founded a cybersecurity firm in 2005, sold it for $50 million. Funds scholarships for children of Gulf War veterans.',
                  decorations: ['Army Achievement Medal']
                },
                {
                  id: 'a13-dvr',
                  name: 'PFC William "Billy" Crawford',
                  type: 'person',
                  role: 'Driver',
                  callsign: 'Assassin 1-3 Driver',
                  age: 19,
                  hometown: 'Rural Kentucky',
                  currentLocation: 'Lexington, KY',
                  career: 'Horse trainer, Churchill Downs',
                  bio: 'Grew up in coal country when the mines were closing. Billy loved anything with an engine—trucks, tractors, tanks. After the Army, combined his love of power and precision as a horse trainer. Has trained three Kentucky Derby winners.',
                  decorations: ['Army Achievement Medal']
                }
              ]
            },
            {
              id: 'a-14',
              name: 'A-14 "Apocalypse"',
              type: 'tank',
              children: [
                {
                  id: 'a14-tc',
                  name: 'SSG Derek "D" Thompson',
                  type: 'person',
                  role: 'Tank Commander',
                  callsign: 'Assassin 1-4',
                  age: 29,
                  hometown: 'Atlanta, Georgia',
                  currentLocation: 'Deceased - 2003',
                  career: 'Army career, KIA in Iraq 2003',
                  bio: 'Derek loved the Army and stayed in after Desert Storm. Rose to First Sergeant and deployed to Iraq in 2003. Killed by an IED in Baghdad while checking on his soldiers. Remembered as a leader who always put his men first. His son later enlisted and served in Afghanistan.',
                  decorations: ['Bronze Star with V', 'Purple Heart (posthumous)']
                },
                {
                  id: 'a14-gnr',
                  name: 'SGT Michael "Mike" O\'Connor',
                  type: 'person',
                  role: 'Gunner',
                  callsign: 'Assassin 1-4 Gunner',
                  age: 24,
                  hometown: 'Philadelphia, Pennsylvania',
                  currentLocation: 'Philadelphia, PA',
                  career: 'Philadelphia Police, homicide detective',
                  bio: 'Tough kid from Kensington who joined the Army to straighten out. Found purpose and discipline in the tank corps. Became a cop after the war, now a decorated homicide detective. Still keeps a photo of his Desert Storm crew on his desk.',
                  decorations: ['Army Commendation Medal']
                },
                {
                  id: 'a14-ldr',
                  name: 'SPC Jason "Jay" Patel',
                  type: 'person',
                  role: 'Loader',
                  callsign: 'Assassin 1-4 Loader',
                  age: 22,
                  hometown: 'Edison, New Jersey',
                  currentLocation: 'New York, NY',
                  career: 'Cardiologist, Mount Sinai Hospital',
                  bio: 'First-generation American whose parents immigrated from Gujarat. Jay wanted to prove his patriotism by serving. The discipline and pressure of combat taught him to stay calm in any crisis. Became a cardiologist, one of the top in New York City.',
                  decorations: ['Army Achievement Medal']
                },
                {
                  id: 'a14-dvr',
                  name: 'PFC Samuel "Sammy" Brown',
                  type: 'person',
                  role: 'Driver',
                  callsign: 'Assassin 1-4 Driver',
                  age: 19,
                  hometown: 'Jackson, Mississippi',
                  currentLocation: 'Jackson, MS',
                  career: 'Baptist minister, community activist',
                  bio: 'Raised by his grandmother in a small house near the Pearl River. Sammy was quiet but steady, the most reliable driver in the platoon. Found his voice after the war and became a preacher. Runs community programs for veterans and at-risk youth in Jackson.',
                  decorations: ['Army Achievement Medal']
                }
              ]
            }
          ]
        },
        {
          id: 'a-2',
          name: '2nd Platoon "Archangel"',
          type: 'platoon',
          callsign: 'ASSASSIN 2',
          children: [
            {
              id: 'a-21',
              name: 'A-21 "Archangel"',
              type: 'tank',
              children: [
                {
                  id: 'a21-tc',
                  name: '1LT Brian "Bri" Henderson',
                  type: 'person',
                  role: 'Platoon Leader / Tank Commander',
                  callsign: 'Assassin 2-1',
                  age: 24,
                  hometown: 'Denver, Colorado',
                  currentLocation: 'Colorado Springs, CO',
                  career: 'Retired Colonel, teaches at Air Force Academy',
                  bio: 'Fresh from Armor Officer Basic when he deployed, Brian grew up fast in the desert. Led his platoon through every engagement without losing a man. Stayed in the Army for 28 years, retiring as a Colonel. Now teaches military history and leadership at the Air Force Academy.',
                  decorations: ['Bronze Star with V', 'Army Commendation Medal']
                },
                {
                  id: 'a21-gnr',
                  name: 'SGT Antonio "Tony" Gonzalez',
                  type: 'person',
                  role: 'Gunner',
                  callsign: 'Assassin 2-1 Gunner',
                  age: 26,
                  hometown: 'Miami, Florida',
                  currentLocation: 'Tampa, FL',
                  career: 'FBI Special Agent, retired',
                  bio: 'Cuban-American whose family fled Castro in 1962. Tony joined to honor the country that gave them freedom. Cool under pressure with exceptional situational awareness. Joined the FBI after the Army, spending 25 years on counterterrorism. Now consults on veteran mental health programs.',
                  decorations: ['Army Commendation Medal with V']
                },
                {
                  id: 'a21-ldr',
                  name: 'SPC Ronald "Ronnie" Davis',
                  type: 'person',
                  role: 'Loader',
                  callsign: 'Assassin 2-1 Loader',
                  age: 21,
                  hometown: 'Oakland, California',
                  currentLocation: 'Oakland, CA',
                  career: 'High school principal',
                  bio: 'Grew up in East Oakland, lost friends to street violence. The Army was his way out. Discovered a love of learning and teaching. Used the GI Bill for a teaching degree, worked his way up to principal. His school has one of the highest veteran employment rates in the district.',
                  decorations: ['Army Achievement Medal']
                },
                {
                  id: 'a21-dvr',
                  name: 'PFC Steven "Steve" Morrison',
                  type: 'person',
                  role: 'Driver',
                  callsign: 'Assassin 2-1 Driver',
                  age: 20,
                  hometown: 'Portland, Maine',
                  currentLocation: 'Portland, ME',
                  career: 'Lobster boat captain, restaurant owner',
                  bio: 'A Maine boy who\'d never been south of Boston before basic training. Steve missed the ocean terribly in the desert. Came home, bought a lobster boat, and eventually opened a seafood restaurant. Hosts a free dinner for veterans every Veterans Day.',
                  decorations: ['Army Achievement Medal']
                }
              ]
            }
          ]
        },
        {
          id: 'a-3',
          name: '3rd Platoon "Attitude"',
          type: 'platoon',
          callsign: 'ASSASSIN 3',
          children: [
            {
              id: 'a-31',
              name: 'A-31 "Attitude Adjuster"',
              type: 'tank',
              children: [
                {
                  id: 'a31-tc',
                  name: '1LT Jennifer "Jen" Walsh',
                  type: 'person',
                  role: 'Platoon Leader / Tank Commander',
                  callsign: 'Assassin 3-1',
                  age: 25,
                  hometown: 'Seattle, Washington',
                  currentLocation: 'Seattle, WA',
                  career: 'Tech company CEO, veteran advocate',
                  bio: 'One of the first female tank officers, assigned just before Desert Storm when policies were changing. Faced doubters but silenced them through competence. Her platoon performed flawlessly. Left the Army to found a tech company focused on prosthetics for wounded veterans. Passionate advocate for women in combat roles.',
                  decorations: ['Bronze Star', 'Army Commendation Medal']
                },
                {
                  id: 'a31-gnr',
                  name: 'SGT Richard "Rich" Kowalczyk',
                  type: 'person',
                  role: 'Gunner',
                  callsign: 'Assassin 3-1 Gunner',
                  age: 27,
                  hometown: 'Pittsburgh, Pennsylvania',
                  currentLocation: 'Pittsburgh, PA',
                  career: 'Steelworker, union organizer',
                  bio: 'Polish-American from a long line of steelworkers. Rich joined when the mills started closing. Found he was a natural gunner—steady, patient, precise. Returned to Pittsburgh when the steel industry started recovering, became a union leader advocating for worker safety and veteran hiring.',
                  decorations: ['Army Commendation Medal']
                },
                {
                  id: 'a31-ldr',
                  name: 'SPC Andre "Dre" Washington',
                  type: 'person',
                  role: 'Loader',
                  callsign: 'Assassin 3-1 Loader',
                  age: 22,
                  hometown: 'New Orleans, Louisiana',
                  currentLocation: 'New Orleans, LA',
                  career: 'Jazz musician, music teacher',
                  bio: 'Grew up in the Tremé, surrounded by music. Andre joined the Army to see the world, but never stopped playing. Had a trumpet shipped to him in Saudi Arabia. Came home and became a professional musician, teaching jazz to the next generation in the same neighborhood where he grew up.',
                  decorations: ['Army Achievement Medal']
                },
                {
                  id: 'a31-dvr',
                  name: 'PFC Christopher "Chris" Olsen',
                  type: 'person',
                  role: 'Driver',
                  callsign: 'Assassin 3-1 Driver',
                  age: 19,
                  hometown: 'Fargo, North Dakota',
                  currentLocation: 'Bismarck, ND',
                  career: 'State legislator, farmer',
                  bio: 'From a farming family going back four generations. Chris saw military service as his duty, just like his grandfather in WWII. Returned home to the farm but got involved in local politics. Now serves in the state legislature, advocating for rural veterans\' healthcare access.',
                  decorations: ['Army Achievement Medal']
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'b-co',
      name: 'B Company "Bandit"',
      type: 'company',
      callsign: 'BANDIT',
      children: [
        {
          id: 'b-co-hq',
          name: 'Company Headquarters',
          type: 'platoon',
          children: [
            {
              id: 'b-co-66',
              name: 'B-66 "Bandit Six"',
              type: 'tank',
              children: [
                {
                  id: 'b-co-cdr',
                  name: 'CPT Mark T. Gerges',
                  type: 'person',
                  role: 'Company Commander / Tank Commander',
                  callsign: 'Bandit 6',
                  age: 29,
                  hometown: 'Various (Army brat)',
                  currentLocation: 'Kansas',
                  career: 'Retired Colonel, military historian, author',
                  bio: 'Author of "Bandit: The Inside Story of an Abrams Tank Company during Desert Storm." Led Bravo Company through every major engagement of the ground war. Later earned a PhD in history and served as a professor at the Command and General Staff College. His book documents the experiences of the 63 soldiers who served under his command.',
                  decorations: ['Bronze Star with V', 'Army Commendation Medal'],
                  special: true
                },
                {
                  id: 'b66-gnr',
                  name: 'SGT Paul "Pablo" Hernandez',
                  type: 'person',
                  role: 'Gunner',
                  callsign: 'Bandit 6 Gunner',
                  age: 25,
                  hometown: 'Laredo, Texas',
                  currentLocation: 'San Antonio, TX',
                  career: 'Border Patrol supervisor, retired',
                  bio: 'Bilingual son of the border, Pablo was known for his quick reflexes and quicker wit. His accuracy was legendary in the company. Joined Border Patrol after the Army, serving 25 years. Now retired, he volunteers teaching firearms safety to youth groups.',
                  decorations: ['Army Commendation Medal with V']
                },
                {
                  id: 'b66-ldr',
                  name: 'SPC Timothy "Tim" McCarthy',
                  type: 'person',
                  role: 'Loader',
                  callsign: 'Bandit 6 Loader',
                  age: 23,
                  hometown: 'South Boston, Massachusetts',
                  currentLocation: 'Boston, MA',
                  career: 'Boston Police detective',
                  bio: 'A Southie kid through and through, Tim brought Boston attitude to the desert. Fast loader, loyal friend, would do anything for his crew. Became a Boston cop after the Army, working his way to detective. Still calls his old crewmates "wicked good guys."',
                  decorations: ['Army Commendation Medal']
                },
                {
                  id: 'b66-dvr',
                  name: 'PFC Joseph "Joey" Caruso',
                  type: 'person',
                  role: 'Driver',
                  callsign: 'Bandit 6 Driver',
                  age: 20,
                  hometown: 'Newark, New Jersey',
                  currentLocation: 'Jersey City, NJ',
                  career: 'Construction company owner',
                  bio: 'Joey learned to drive on Newark streets, which he claimed was better training than anything the Army offered. Natural vehicle sense made him an exceptional tank driver. Started a construction company after the Army, now employs over 100 people, many of them veterans.',
                  decorations: ['Army Achievement Medal']
                }
              ]
            }
          ]
        },
        {
          id: 'b-1',
          name: '1st Platoon "Blackjack"',
          type: 'platoon',
          callsign: 'BANDIT 1',
          children: [
            {
              id: 'b-11',
              name: 'B-11 "Blackjack"',
              type: 'tank',
              children: [
                {
                  id: 'b11-tc',
                  name: 'SFC George "Geo" Adams',
                  type: 'person',
                  role: 'Platoon Sergeant / Tank Commander',
                  callsign: 'Bandit 1-1',
                  age: 36,
                  hometown: 'Gary, Indiana',
                  currentLocation: 'Indianapolis, IN',
                  career: 'VA hospital administrator',
                  bio: 'Eighteen years in tanks by Desert Storm, George was the old man of the platoon. A calming presence who\'d seen it all. After retirement, dedicated himself to serving veterans at the Indianapolis VA, eventually becoming an administrator. Still calls former soldiers on their birthdays.',
                  decorations: ['Bronze Star with V', 'Meritorious Service Medal']
                },
                {
                  id: 'b11-gnr',
                  name: 'SGT Harold "Harry" Wilson',
                  type: 'person',
                  role: 'Gunner',
                  callsign: 'Bandit 1-1 Gunner',
                  age: 24,
                  hometown: 'Buffalo, New York',
                  currentLocation: 'Rochester, NY',
                  career: 'Optometrist',
                  bio: 'The irony isn\'t lost on Harry that a gunner became an eye doctor. Known for exceptional vision and attention to detail. Used the GI Bill to get through optometry school. Has provided free eye exams to hundreds of veterans over his career.',
                  decorations: ['Army Commendation Medal']
                },
                {
                  id: 'b11-ldr',
                  name: 'SPC Marcus "Mark" Johnson',
                  type: 'person',
                  role: 'Loader',
                  callsign: 'Bandit 1-1 Loader',
                  age: 22,
                  hometown: 'Baltimore, Maryland',
                  currentLocation: 'Baltimore, MD',
                  career: 'Middle school teacher',
                  bio: 'From West Baltimore, Marcus joined the Army looking for structure and opportunity. Found both. The discipline and teamwork he learned became the foundation of his teaching philosophy. Has taught in Baltimore public schools for 30 years, reaching thousands of kids.',
                  decorations: ['Army Achievement Medal']
                },
                {
                  id: 'b11-dvr',
                  name: 'PFC Eric "E" Swanson',
                  type: 'person',
                  role: 'Driver',
                  callsign: 'Bandit 1-1 Driver',
                  age: 19,
                  hometown: 'Duluth, Minnesota',
                  currentLocation: 'Duluth, MN',
                  career: 'Ship captain, Great Lakes freighter',
                  bio: 'Grew up watching ore boats on Lake Superior, dreaming of being a captain. The Army taught him discipline and navigation. Came home and worked his way up from deckhand to captain. Now pilots thousand-foot freighters across the Great Lakes.',
                  decorations: ['Army Achievement Medal']
                }
              ]
            }
          ]
        },
        {
          id: 'b-2',
          name: '2nd Platoon "Bounty Hunter"',
          type: 'platoon',
          callsign: 'BANDIT 2',
          children: [
            {
              id: 'b-21',
              name: 'B-21 "Bounty Hunter"',
              type: 'tank',
              children: [
                {
                  id: 'b21-tc',
                  name: '1LT David "Dave" Marshall',
                  type: 'person',
                  role: 'Platoon Leader / Tank Commander',
                  callsign: 'Bandit 2-1',
                  age: 24,
                  hometown: 'Richmond, Virginia',
                  currentLocation: 'Richmond, VA',
                  career: 'Attorney, JAG veteran',
                  bio: 'ROTC at VMI prepared him for leadership, but nothing prepared him for combat. Dave led his platoon with quiet competence. Stayed in the Army, switching to JAG after law school. Now in private practice specializing in veterans\' benefits claims.',
                  decorations: ['Bronze Star', 'Army Commendation Medal']
                },
                {
                  id: 'b21-gnr',
                  name: 'SGT Kenneth "Kenny" Brooks',
                  type: 'person',
                  role: 'Gunner',
                  callsign: 'Bandit 2-1 Gunner',
                  age: 26,
                  hometown: 'Columbia, South Carolina',
                  currentLocation: 'Charleston, SC',
                  career: 'Master electrician, contractor',
                  bio: 'Learned his steady hands from his grandfather, a carpenter. Kenny could thread a needle with the main gun. Used his technical aptitude to become a master electrician. Owns a contracting company specializing in historic renovation in Charleston.',
                  decorations: ['Army Commendation Medal']
                },
                {
                  id: 'b21-ldr',
                  name: 'SPC Brian "Bry" O\'Malley',
                  type: 'person',
                  role: 'Loader',
                  callsign: 'Bandit 2-1 Loader',
                  age: 21,
                  hometown: 'Worcester, Massachusetts',
                  currentLocation: 'Worcester, MA',
                  career: 'Brewery owner',
                  bio: 'Irish-American who jokes he enlisted to get away from cold Massachusetts winters, only to find himself in a different kind of hostile environment. Started a craft brewery after the Army, naming several beers after his Desert Storm experiences. "Sandstorm IPA" is the bestseller.',
                  decorations: ['Army Achievement Medal']
                },
                {
                  id: 'b21-dvr',
                  name: 'PFC Carlos "Los" Rivera',
                  type: 'person',
                  role: 'Driver',
                  callsign: 'Bandit 2-1 Driver',
                  age: 19,
                  hometown: 'San Juan, Puerto Rico',
                  currentLocation: 'Orlando, FL',
                  career: 'Theme park operations manager',
                  bio: 'Left Puerto Rico for adventure, found more than he bargained for. Carlos was known for keeping his cool in the tightest situations. After the Army, moved to Orlando and worked his way up at Disney, now manages ride operations. Says nothing is stressful compared to combat.',
                  decorations: ['Army Achievement Medal']
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'c-co',
      name: 'C Company "Cold Steel"',
      type: 'company',
      callsign: 'COLD STEEL',
      children: [
        {
          id: 'c-co-hq',
          name: 'Company Headquarters',
          type: 'platoon',
          children: [
            {
              id: 'c-66',
              name: 'C-66 "Cold Steel Six"',
              type: 'tank',
              children: [
                {
                  id: 'c-co-cdr',
                  name: 'CPT Robert "Bob" Chen',
                  type: 'person',
                  role: 'Company Commander / Tank Commander',
                  callsign: 'Cold Steel 6',
                  age: 30,
                  hometown: 'San Francisco, California',
                  currentLocation: 'Monterey, CA',
                  career: 'Defense Language Institute instructor',
                  bio: 'Third-generation Chinese-American, grandson of a WWII veteran who served in the 442nd. Bob was known for methodical planning and flawless execution. His company destroyed 23 enemy vehicles at Medina Ridge. Now teaches Mandarin at DLI, preparing the next generation for service.',
                  decorations: ['Silver Star', 'Bronze Star with V']
                },
                {
                  id: 'c66-gnr',
                  name: 'SGT Thomas "TJ" Jefferson',
                  type: 'person',
                  role: 'Gunner',
                  callsign: 'Cold Steel 6 Gunner',
                  age: 27,
                  hometown: 'Charlottesville, Virginia',
                  currentLocation: 'Richmond, VA',
                  career: 'History museum curator',
                  bio: 'Yes, he\'s heard all the jokes about his name. TJ grew up fascinated by history and joined the Army to make some of his own. An exceptional gunner who could hit targets at maximum range. Now curates exhibits at the Virginia War Memorial, including one on Desert Storm.',
                  decorations: ['Army Commendation Medal with V']
                },
                {
                  id: 'c66-ldr',
                  name: 'SPC William "Will" Strongeagle',
                  type: 'person',
                  role: 'Loader',
                  callsign: 'Cold Steel 6 Loader',
                  age: 23,
                  hometown: 'Tulsa, Oklahoma',
                  currentLocation: 'Tahlequah, OK',
                  career: 'Cherokee Nation council member',
                  bio: 'Cherokee citizen whose family has a long tradition of military service. Will was the strongest man in the company, could load rounds all day without tiring. Returned home to serve his nation in a different way, now on the Cherokee Nation tribal council.',
                  decorations: ['Army Commendation Medal']
                },
                {
                  id: 'c66-dvr',
                  name: 'PFC Michael "Mikey" Antonelli',
                  type: 'person',
                  role: 'Driver',
                  callsign: 'Cold Steel 6 Driver',
                  age: 20,
                  hometown: 'Providence, Rhode Island',
                  currentLocation: 'Providence, RI',
                  career: 'Restaurant owner, chef',
                  bio: 'Italian-American kid who grew up in his grandmother\'s kitchen. The food in the desert was a crime against humanity, he\'d say. Came home, went to culinary school, and opened an Italian restaurant. Serves a free meal to any veteran who walks in on November 11th.',
                  decorations: ['Army Achievement Medal']
                }
              ]
            }
          ]
        },
        {
          id: 'c-1',
          name: '1st Platoon "Crusader"',
          type: 'platoon',
          callsign: 'COLD STEEL 1',
          children: [
            {
              id: 'c-11',
              name: 'C-11 "Crusader"',
              type: 'tank',
              children: [
                {
                  id: 'c11-tc',
                  name: 'SFC Patrick "Paddy" Flynn',
                  type: 'person',
                  role: 'Platoon Sergeant / Tank Commander',
                  callsign: 'Cold Steel 1-1',
                  age: 35,
                  hometown: 'Chicago, Illinois',
                  currentLocation: 'Chicago, IL',
                  career: 'Fire chief, retired',
                  bio: 'South Side Irish, sixteen years in armor by Desert Storm. Paddy ran his tank like a well-oiled machine. After the Army, joined the Chicago Fire Department, rising to chief before retirement. His son and daughter both serve in the military today.',
                  decorations: ['Bronze Star with V', 'Meritorious Service Medal']
                },
                {
                  id: 'c11-gnr',
                  name: 'SGT Lawrence "Larry" Washington',
                  type: 'person',
                  role: 'Gunner',
                  callsign: 'Cold Steel 1-1 Gunner',
                  age: 25,
                  hometown: 'St. Louis, Missouri',
                  currentLocation: 'Ferguson, MO',
                  career: 'Police chief, community liaison',
                  bio: 'Larry grew up in North St. Louis, joined the Army to build a future. Exceptional marksmanship translated to a law enforcement career. Worked his way to police chief of a small department, focused on community relations and veteran mental health programs.',
                  decorations: ['Army Commendation Medal']
                },
                {
                  id: 'c11-ldr',
                  name: 'SPC Gregory "Greg" Hoffmann',
                  type: 'person',
                  role: 'Loader',
                  callsign: 'Cold Steel 1-1 Loader',
                  age: 22,
                  hometown: 'Milwaukee, Wisconsin',
                  currentLocation: 'Madison, WI',
                  career: 'Brewmaster, craft brewery',
                  bio: 'German-American from Milwaukee, which means beer is in his blood. Greg was the quiet professional of the crew, always reliable. Used his GI Bill for brewing science, now runs one of Wisconsin\'s most acclaimed craft breweries.',
                  decorations: ['Army Achievement Medal']
                },
                {
                  id: 'c11-dvr',
                  name: 'PFC Nathan "Nate" Blackwood',
                  type: 'person',
                  role: 'Driver',
                  callsign: 'Cold Steel 1-1 Driver',
                  age: 19,
                  hometown: 'Appalachian Virginia',
                  currentLocation: 'Roanoke, VA',
                  career: 'EMT supervisor, volunteer fire chief',
                  bio: 'From the coal country of Southwest Virginia, Nate joined for opportunity. Discovered a calling for saving lives. Became an EMT after the Army, now supervises emergency services and serves as volunteer fire chief. Has trained hundreds of first responders.',
                  decorations: ['Army Achievement Medal']
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'd-co',
      name: 'D Company "Demon"',
      type: 'company',
      callsign: 'DEMON',
      children: [
        {
          id: 'd-co-hq',
          name: 'Company Headquarters',
          type: 'platoon',
          children: [
            {
              id: 'd-66',
              name: 'D-66 "Demon Six"',
              type: 'tank',
              children: [
                {
                  id: 'd-co-cdr',
                  name: 'CPT Andrew "Drew" Mackenzie',
                  type: 'person',
                  role: 'Company Commander / Tank Commander',
                  callsign: 'Demon 6',
                  age: 31,
                  hometown: 'Tacoma, Washington',
                  currentLocation: 'Joint Base Lewis-McChord, WA',
                  career: 'Retired Brigadier General',
                  bio: 'Scottish-American whose grandfather immigrated through Ellis Island. Drew was aggressive in the attack, protective of his soldiers. Stayed in the Army for 32 years, retiring as a one-star general. Now mentors junior officers and advocates for veteran causes.',
                  decorations: ['Silver Star', 'Bronze Star with V', 'Legion of Merit']
                },
                {
                  id: 'd66-gnr',
                  name: 'SGT Victor "Vic" Petrov',
                  type: 'person',
                  role: 'Gunner',
                  callsign: 'Demon 6 Gunner',
                  age: 26,
                  hometown: 'Sacramento, California',
                  currentLocation: 'Sacramento, CA',
                  career: 'Commercial pilot, airline captain',
                  bio: 'Son of Russian Jewish immigrants who fled the Soviet Union. Vic\'s precision with the main gun translated well to aviation. Used the GI Bill to get his pilot license, worked up to airline captain. Has flown millions of miles keeping passengers safe.',
                  decorations: ['Army Commendation Medal with V']
                },
                {
                  id: 'd66-ldr',
                  name: 'SPC Derek "D" Mitchell',
                  type: 'person',
                  role: 'Loader',
                  callsign: 'Demon 6 Loader',
                  age: 22,
                  hometown: 'Kansas City, Missouri',
                  currentLocation: 'Kansas City, MO',
                  career: 'BBQ restaurant owner, pitmaster',
                  bio: 'Derek learned to work fast and efficient, loading rounds like his daddy taught him to work the smoker. Came home and opened a BBQ joint that\'s become a Kansas City landmark. Veterans eat free on the 28th of every month—the day the ceasefire was declared.',
                  decorations: ['Army Achievement Medal']
                },
                {
                  id: 'd66-dvr',
                  name: 'PFC Ryan "Ry" O\'Neill',
                  type: 'person',
                  role: 'Driver',
                  callsign: 'Demon 6 Driver',
                  age: 19,
                  hometown: 'Scranton, Pennsylvania',
                  currentLocation: 'Scranton, PA',
                  career: 'Electrician, IBEW local president',
                  bio: 'Working-class kid from Scranton who joined for the opportunities. Steady driver who could navigate anything. Became an electrician through the union, rose to local president. Advocates for apprenticeship programs that prioritize veterans.',
                  decorations: ['Army Achievement Medal']
                }
              ]
            }
          ]
        },
        {
          id: 'd-1',
          name: '1st Platoon "Destroyer"',
          type: 'platoon',
          callsign: 'DEMON 1',
          children: [
            {
              id: 'd-11',
              name: 'D-11 "Destroyer"',
              type: 'tank',
              children: [
                {
                  id: 'd11-tc',
                  name: 'SFC James "Jim" Whitehorse',
                  type: 'person',
                  role: 'Platoon Sergeant / Tank Commander',
                  callsign: 'Demon 1-1',
                  age: 34,
                  hometown: 'Navajo Nation, Arizona',
                  currentLocation: 'Window Rock, AZ',
                  career: 'Navajo Nation veterans liaison',
                  bio: 'Navajo code talker\'s grandson, carrying on a warrior tradition. Jim brought calm leadership and spiritual strength to his crew. After retirement, returned to the reservation to serve as veterans liaison, helping Navajo veterans navigate the VA system.',
                  decorations: ['Bronze Star with V', 'Meritorious Service Medal']
                },
                {
                  id: 'd11-gnr',
                  name: 'SGT Benjamin "Ben" Goldstein',
                  type: 'person',
                  role: 'Gunner',
                  callsign: 'Demon 1-1 Gunner',
                  age: 25,
                  hometown: 'Long Island, New York',
                  currentLocation: 'New York, NY',
                  career: 'Investment banker, philanthropist',
                  bio: 'Jewish kid from Great Neck who wanted to serve before going into the family business. Ben\'s precision earned him recognition as one of the best gunners in the battalion. Now runs a foundation providing scholarships to children of fallen soldiers.',
                  decorations: ['Army Commendation Medal with V']
                },
                {
                  id: 'd11-ldr',
                  name: 'SPC Isaiah "Izzy" Thompson',
                  type: 'person',
                  role: 'Loader',
                  callsign: 'Demon 1-1 Loader',
                  age: 21,
                  hometown: 'Savannah, Georgia',
                  currentLocation: 'Atlanta, GA',
                  career: 'Civil rights attorney',
                  bio: 'From a family with roots in Savannah going back to slavery. Izzy\'s great-grandfather served in WWI, grandfather in WWII, father in Vietnam. After the Army, law school at Howard. Now a civil rights attorney in Atlanta, fighting for justice.',
                  decorations: ['Army Achievement Medal']
                },
                {
                  id: 'd11-dvr',
                  name: 'PFC Matthew "Matt" Kowalski',
                  type: 'person',
                  role: 'Driver',
                  callsign: 'Demon 1-1 Driver',
                  age: 19,
                  hometown: 'Hamtramck, Michigan',
                  currentLocation: 'Detroit, MI',
                  career: 'Auto industry executive',
                  bio: 'Polish-American from the Detroit area, cars in his blood. Matt could feel what the tank needed before the instruments showed it. Went to work for GM after the Army, rose through the ranks. Now VP of manufacturing, champion of veteran hiring programs.',
                  decorations: ['Army Achievement Medal']
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

// Battalion Explorer Component
const BattalionExplorer = () => {
  const [expandedNodes, setExpandedNodes] = useState(new Set(['bn-hq']));
  const [selectedPerson, setSelectedPerson] = useState(null);

  const toggleNode = (nodeId) => {
    setExpandedNodes(prev => {
      const next = new Set(prev);
      if (next.has(nodeId)) {
        next.delete(nodeId);
      } else {
        next.add(nodeId);
      }
      return next;
    });
  };

  const getNodeIcon = (type) => {
    switch (type) {
      case 'battalion':
      case 'company':
      case 'staff':
        return <FolderIcon size={18} />;
      case 'platoon':
        return <FolderIcon size={16} />;
      case 'tank':
        return <TankIcon size={16} />;
      case 'person':
        return <UserIcon size={16} />;
      default:
        return <FolderIcon size={16} />;
    }
  };

  const renderNode = (node, depth = 0) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expandedNodes.has(node.id);
    const isPerson = node.type === 'person';

    return (
      <div key={node.id} className="explorer-node">
        <div
          className={`explorer-node-header ${isPerson ? 'person' : ''} ${node.special ? 'special' : ''}`}
          style={{ paddingLeft: `${depth * 20 + 12}px` }}
          onClick={() => isPerson ? setSelectedPerson(node) : toggleNode(node.id)}
        >
          {hasChildren && (
            <span className={`explorer-chevron ${isExpanded ? 'expanded' : ''}`}>
              <ChevronRightIcon />
            </span>
          )}
          {!hasChildren && <span className="explorer-chevron-placeholder" />}
          <span className={`explorer-icon ${node.type}`}>
            {getNodeIcon(node.type)}
          </span>
          <span className="explorer-label">
            {node.name}
            {node.callsign && !isPerson && (
              <span className="explorer-callsign">{node.callsign}</span>
            )}
          </span>
          {isPerson && node.role && (
            <span className="explorer-role">{node.role}</span>
          )}
        </div>
        {hasChildren && isExpanded && (
          <div className="explorer-children">
            {node.children.map(child => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="battalion-explorer">
      <div className="explorer-tree">
        <div className="explorer-instructions">
          Click to expand units and discover the soldiers of 2-70 Armor
        </div>
        {renderNode(battalionData)}
      </div>

      {selectedPerson && (
        <div className="explorer-detail-overlay" onClick={() => setSelectedPerson(null)}>
          <div className="explorer-detail" onClick={e => e.stopPropagation()}>
            <button className="detail-close" onClick={() => setSelectedPerson(null)}>
              <CloseIcon size={20} />
            </button>

            <div className="detail-header">
              <div className="detail-avatar">
                {selectedPerson.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
              </div>
              <div className="detail-title">
                <h3>{selectedPerson.name}</h3>
                <p className="detail-role">{selectedPerson.role}</p>
                {selectedPerson.callsign && (
                  <p className="detail-callsign">"{selectedPerson.callsign}"</p>
                )}
              </div>
            </div>

            <div className="detail-stats">
              <div className="detail-stat">
                <span className="stat-label">Age in 1991</span>
                <span className="stat-value">{selectedPerson.age}</span>
              </div>
              <div className="detail-stat">
                <span className="stat-label">Hometown</span>
                <span className="stat-value">{selectedPerson.hometown}</span>
              </div>
            </div>

            <div className="detail-section">
              <h4>Where Are They Now</h4>
              <p className="detail-location">{selectedPerson.currentLocation}</p>
              <p>{selectedPerson.career}</p>
            </div>

            <div className="detail-section">
              <h4>Their Story</h4>
              <p>{selectedPerson.bio}</p>
            </div>

            {selectedPerson.decorations && (
              <div className="detail-section">
                <h4>Decorations</h4>
                <div className="detail-decorations">
                  {selectedPerson.decorations.map((dec, i) => (
                    <span key={i} className="decoration-badge">
                      <StarIcon size={12} /> {dec}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {selectedPerson.special && (
              <div className="detail-special">
                <BookIcon /> Author of "Bandit" - the story of this company
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const HlsVideoPlayer = ({ src }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });
      return () => hls.destroy();
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
      video.play();
    }
  }, [src]);

  return (
    <div className="video-container">
      <video
        ref={videoRef}
        controls
        className="hls-video-player"
      />
    </div>
  );
};

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const videoPlayerRef = useRef(null);

  const handleVideoSelect = (index) => {
    setActiveVideoIndex(index);
  };

  const videos = [
    { title: "Tigers in the Sand", date: "1991", description: "Documentary footage of Iron Tigers operations in the Saudi desert.", hlsUrl: "https://image.admin.solutions/raw-video-2-70-armor-desert-storm/141f6617-6095-43ee-bd53-44124cd7909e/541d63b2-6871-46b5-961b-8b61cf635dd8/1f93cdd4-b9bb-49b9-9321-ae1faeae031d" },
    { title: "Tigers in the Sand (with music)", date: "1991", description: "Documentary with musical score capturing the battalion's Desert Storm experience.", hlsUrl: "https://image.admin.solutions/tigers-in-the-sand-with-music/141f6617-6095-43ee-bd53-44124cd7909e/541d63b2-6871-46b5-961b-8b61cf635dd8/ee11ddb8-1051-4c99-96c7-8444ae163be0" },
    { title: "Iron Tigers Homecoming", date: "May 5, 1991", description: "The battalion returns to Erlangen, Germany after liberating Kuwait.", hlsUrl: "https://image.admin.solutions/iron-tigers-homecoming/141f6617-6095-43ee-bd53-44124cd7909e/541d63b2-6871-46b5-961b-8b61cf635dd8/ab59482a-2cda-4959-9dc6-1a02ddb3084a" },
    { title: "Army Recruiting Video", date: "1991", description: "Official Army recruiting footage featuring 2-70 Armor soldiers.", hlsUrl: "https://image.admin.solutions/army-recruiting-video/141f6617-6095-43ee-bd53-44124cd7909e/541d63b2-6871-46b5-961b-8b61cf635dd8/d896b3fa-4c81-420a-8403-c668b30395ab" },
    { title: "Raw Video: April-May 1991", date: "April-May 1991", description: "Unedited footage from the final weeks of deployment through homecoming ceremonies.", hlsUrl: "https://image.admin.solutions/raw-video/141f6617-6095-43ee-bd53-44124cd7909e/541d63b2-6871-46b5-961b-8b61cf635dd8/4561c78f-9f25-4f9b-b0cf-414c1fafa29a" },
    { title: "Saudi Arabia & Erlangen Homecoming", date: "1991", description: "Miscellaneous video from deployment in Saudi Arabia and the return to Germany.", hlsUrl: "https://image.admin.solutions/more-misc-video-of-saudi-and-in-erlangen-homecoming/141f6617-6095-43ee-bd53-44124cd7909e/541d63b2-6871-46b5-961b-8b61cf635dd8/0f43c61e-207f-4571-aa4c-1414ba1f53c9" },
    { title: "HHC Award Ceremony", date: "1991", description: "Soldiers arriving home and Headquarters Company award ceremony.", hlsUrl: "https://image.admin.solutions/homecoming-videos-of-people-arriving-hhc-award-ceremony/141f6617-6095-43ee-bd53-44124cd7909e/541d63b2-6871-46b5-961b-8b61cf635dd8/1d3b1f71-aef9-49bc-8ecb-69daf7b38e19" }
  ];

  const timeline = [
    { date: "August 1990", title: "Iraq Invades Kuwait", description: "Saddam Hussein orders Iraqi forces into Kuwait. The UN condemns the invasion and begins building a military coalition." },
    { date: "November 1990", title: "1st Armored Division Alerted", description: "The 'Old Ironsides' division receives deployment orders. 2-70 Armor begins preparations at Erlangen, Germany." },
    { date: "December 31, 1990", title: "Deployment to Saudi Arabia", description: "Most battalion personnel fly from Germany to Saudi Arabia. Equipment ships from Bremerhaven arrive at Dammam." },
    { date: "February 24, 1991", title: "G-Day: Ground War Begins", description: "2-70 Armor crosses into Iraq as part of VII Corps' main flanking attack against the Republican Guard." },
    { date: "February 25, 1991", title: "Battle of Al Busayyah", description: "The Iron Tigers attack a major Iraqi logistics center defended by infantry and tanks, quickly defeating the enemy." },
    { date: "February 27, 1991", title: "Battle of Medina Ridge", description: "The largest tank battle since World War II. 2nd Brigade destroys 61 T-72s and T-55s, 34 APCs in under an hour." },
    { date: "February 28, 1991", title: "Ceasefire Declared", description: "Combat operations end. The battalion maintains combat posture in northern Kuwait and southern Iraq." },
    { date: "May 1991", title: "Homecoming to Erlangen", description: "The main body redeploys to Erlangen, Germany. The Iron Tigers are awarded the Valorous Unit Award." }
  ];

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="nav">
        <div className="nav-container">
          <div className="nav-logo">
            <h1>2-70 ARMOR</h1>
            <span>Iron Tigers</span>
          </div>
          <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <XIcon /> : <MenuIcon />}
          </button>
          <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
            {[['battalion', 'Battalion'], ['explorer', 'Explorer'], ['timeline', 'Timeline'], ['videos', 'Videos'], ['book', 'Book'], ['forward-together', 'Forward Together'], ['connect', 'Connect']].map(([id, label]) => (
              <li key={id}>
                <button onClick={() => scrollToSection(id)}>{label}</button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Hero */}
      <section id="hero" className="hero">
        <div className="hero-bg"></div>
        <div className="hero-content">
          <div className="hero-badge">A Living History Project</div>
          <h1>2-70 ARMOR</h1>
          <h2>"Iron Tigers" • Desert Storm 1991</h2>
          <p className="hero-tagline">
            Preserving the stories of the soldiers who fought in the largest tank battle since World War II
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">89</span>
              <span className="stat-label">Hours of Combat</span>
            </div>
            <div className="stat">
              <span className="stat-number">250</span>
              <span className="stat-label">Kilometers Traveled</span>
            </div>
            <div className="stat">
              <span className="stat-number">768</span>
              <span className="stat-label">Enemy Vehicles Destroyed</span>
            </div>
          </div>
          <div className="scroll-indicator" onClick={() => scrollToSection('battalion')}>
            <ChevronDownIcon />
          </div>
        </div>
      </section>

      {/* Battalion */}
      <section id="battalion" className="section section-tan">
        <div className="container">
          <div className="section-header">
            <span className="subtitle">1st Armored Division • 2nd Brigade • VII Corps</span>
            <h2>The Iron Tigers</h2>
            <p>
              2nd Battalion, 70th Armor Regiment was part of the "heaviest brigade in the war"—three armor battalions 
              and a mechanized infantry battalion that led the 1st Armored Division's assault on the Iraqi Republican Guard.
            </p>
          </div>

          <div className="card-grid">
            <div className="card">
              <div className="card-image">M1A1</div>
              <div className="card-body">
                <h3>Main Battle Tanks</h3>
                <p>
                  The battalion deployed with M1A1 Abrams tanks, equipped with 120mm main guns and advanced thermal sights 
                  that proved decisive in engagements with Iraqi T-72s at ranges beyond enemy capability.
                </p>
              </div>
            </div>

            <div className="card">
              <div className="card-image">2BDE</div>
              <div className="card-body">
                <h3>2nd Brigade "Iron Brigade"</h3>
                <p>
                  Alongside 4/70 Armor, 1/35 Armor, and 6/6 Infantry, the 2nd Brigade acted as the lead brigade during 
                  combat operations, engaging the Medina Division of the Republican Guard.
                </p>
              </div>
            </div>

            <div className="card">
              <div className="card-image">VUA</div>
              <div className="card-body">
                <h3>Valorous Unit Award</h3>
                <p>
                  For extraordinary heroism in action against the Iraqi Republican Guard Forces Command, the battalion 
                  was awarded the Valorous Unit Award for actions from February 24-28, 1991.
                </p>
              </div>
            </div>
          </div>

          <div className="health-callout">
            <h3>Gulf War Veteran Health</h3>
            <p>
              Many Desert Storm veterans have experienced health issues related to toxic exposures during deployment—including
              oil well fire smoke, chemical agents, depleted uranium, and other hazards. If you served in the Gulf War and are
              experiencing unexplained symptoms, the VA offers presumptive conditions under the PACT Act.
            </p>
            <a href="https://www.va.gov/health-care/health-needs-conditions/health-issues-related-to-service-era/gulf-war/" target="_blank" rel="noopener noreferrer">
              Learn about VA benefits for Gulf War veterans →
            </a>
          </div>
        </div>
      </section>

      {/* Battalion Explorer */}
      <section id="explorer" className="section section-dark">
        <div className="container">
          <div className="section-header">
            <span className="subtitle">Interactive Organization Chart</span>
            <h2>Battalion Explorer</h2>
            <p>
              Explore the structure of 2-70 Armor during Desert Storm. Click through the organization
              to discover the companies, platoons, tanks, and the soldiers who crewed them. Learn their
              stories—where they came from, what they did, and where they are now.
            </p>
          </div>

          <BattalionExplorer />
        </div>
      </section>

      {/* Timeline */}
      <section id="timeline" className="section section-dark">
        <div className="container">
          <div className="section-header">
            <span className="subtitle">Operation Desert Shield / Desert Storm</span>
            <h2>The Road to Victory</h2>
            <p>
              From alert in Germany to the largest tank battle since World War II, 
              the Iron Tigers traveled thousands of miles to liberate Kuwait.
            </p>
          </div>

          <div className="timeline">
            {timeline.map((item, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-date">
                  <span>{item.date}</span>
                </div>
                <div className="timeline-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Videos */}
      <section id="videos" className="section section-olive">
        <div className="container">
          <div className="section-header">
            <span className="subtitle">Primary Source Footage</span>
            <h2>Tigers in the Sand</h2>
            <p>
              Original video footage from Desert Storm and the homecoming to Erlangen—preserved
              for future generations to understand what these soldiers experienced.
            </p>
          </div>

          <div className="video-layout">
            <div className="video-main">
              <div className="featured-video" ref={videoPlayerRef}>
                {videos[activeVideoIndex].hlsUrl ? (
                  <HlsVideoPlayer src={videos[activeVideoIndex].hlsUrl} />
                ) : (
                  <div className="video-placeholder">
                    <p>Video coming soon</p>
                  </div>
                )}
              </div>
              <div className="video-info">
                <h3>{videos[activeVideoIndex].title}</h3>
                <p className="video-date">{videos[activeVideoIndex].date}</p>
                <p>{videos[activeVideoIndex].description}</p>
              </div>
            </div>

            <div className="video-playlist">
              <h4 className="playlist-header">Videos</h4>
              <div className="playlist-items">
                {videos.map((video, index) => (
                  <div
                    key={index}
                    className={`playlist-item ${index === activeVideoIndex ? 'active' : ''} ${!video.hlsUrl ? 'coming-soon' : ''}`}
                    onClick={() => video.hlsUrl && handleVideoSelect(index)}
                  >
                    <div className="playlist-item-icon">
                      {index === activeVideoIndex ? (
                        <span className="now-playing-icon">▶</span>
                      ) : (
                        <PlayIcon />
                      )}
                    </div>
                    <div className="playlist-item-info">
                      <span className="playlist-item-title">{video.title}</span>
                      <span className="playlist-item-date">{video.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Book */}
      <section id="book" className="section section-dark">
        <div className="container">
          <div className="book-section">
            <div className="book-cover">
              <img
                src="https://image.admin.solutions/bandit-book-cover/141f6617-6095-43ee-bd53-44124cd7909e/541d63b2-6871-46b5-961b-8b61cf635dd8/f4a4439d-88b7-4c0c-bc14-ca2cf6cef058"
                alt="Bandit: The Inside Story of an Abrams Tank Company During Desert Storm - Book Cover"
              />
            </div>
            <div className="book-info">
              <h2>The Book</h2>
              <p className="author">By Mark T. Gerges • Coming April 2026</p>
              <p>
                <em>Bandit: The Inside Story of an Abrams Tank Company during Desert Storm</em> tells the tale of 
                Bravo Company, 2nd Battalion, 70th Armor Regiment—"Bandit"—and the sixty-three soldiers who 
                served in the unit during the Gulf War.
              </p>
              <p>
                Written by Captain Mark T. Gerges, who commanded Bandit during Desert Storm, the book draws on 
                journals, letters, military orders, and extensive interviews with veterans across the battalion 
                to present the full story of one unit inside the arrows drawn on the map.
              </p>
              <p>
                From the final months of the Cold War in Germany through deployment to Saudi Arabia and combat 
                in Iraq—including a firsthand account of the Battle of Medina Ridge—this is the ground-level 
                story of American tankers at war.
              </p>
              <a 
                href="https://www.kentuckypress.com/9781985903906/bandit/"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-button"
              >
                <BookIcon /> Pre-Order Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Forward Together */}
      <section id="forward-together" className="section forward-together">
        <div className="container">
          <div className="ft-content">
            <div className="ft-story">
              <h2>From Desert Storm to <span className="highlight">Forward Together</span></h2>
              <p>
                Some battles don't end when the war does. Many Gulf War veterans returned home with invisible 
                wounds—toxic exposures that would manifest years later as cancers and chronic illness.
              </p>
              <p>
                <strong>Forward Together</strong> was born from one veteran's journey through cancer—a journey 
                connected to his service in Desert Storm. Built to help cancer survivors and their caregivers 
                navigate the hardest moments, the project carries forward the bonds formed in combat.
              </p>
              <blockquote>
                "Someone helped me back then. That's what I'm here to do for you."
              </blockquote>
              <p>
                The AI guides in Forward Together are named after the people who made a difference: 
                <strong> Bob</strong>, named after a company commander who led soldiers through combat, 
                and <strong> Miri</strong>, named after a wife who stood by her husband through his cancer journey.
              </p>
              <a 
                href="https://theforwardtogetherproject.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="cta-button"
              >
                <HeartIcon size={20} /> Visit Forward Together
              </a>
            </div>
            <div className="ft-guides">
              <div className="guide-card">
                <div className="guide-avatar">B</div>
                <h3>Bob</h3>
                <p className="guide-role">Guide for Survivors</p>
                <p className="guide-quote">"I'm a survivor too. I remember what it felt like in the beginning."</p>
              </div>
              <div className="guide-card">
                <div className="guide-avatar">M</div>
                <h3>Miri</h3>
                <p className="guide-role">Guide for Caregivers</p>
                <p className="guide-quote">"I see you too. The person showing up every day."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Connect */}
      <section id="connect" className="section section-tan">
        <div className="container">
          <div className="section-header">
            <span className="subtitle">Veterans & Families</span>
            <h2>Connect With Us</h2>
            <p>
              This is a living history project. If you served with 2-70 Armor, knew someone who did, 
              or have photos, stories, or memories to share, we want to hear from you.
            </p>
          </div>

          <div className="connect-grid">
            <div className="connect-card">
              <div className="connect-icon">
                <UsersIcon />
              </div>
              <h3>Veterans</h3>
              <p>
                Share your stories, photos, and memories from Desert Storm. Help us build a complete 
                picture of what the Iron Tigers experienced.
              </p>
            </div>

            <div className="connect-card">
              <div className="connect-icon">
                <HeartIcon size={28} />
              </div>
              <h3>Families</h3>
              <p>
                If you're a family member of someone who served with 2-70 Armor, your perspective 
                matters too. The home front was part of the story.
              </p>
            </div>

            <div className="connect-card">
              <div className="connect-icon">
                <MailIcon />
              </div>
              <h3>Get In Touch</h3>
              <p>
                Have photos, documents, or stories to contribute? Want to connect with fellow veterans? 
                Reach out and help us preserve this history.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <h3>Strike Swiftly</h3>
        <p>
          Honoring the soldiers of 2nd Battalion, 70th Armor Regiment who served in Operation Desert Storm. 
          Their courage and sacrifice will not be forgotten.
        </p>
        <div className="footer-links">
          <button onClick={() => scrollToSection('battalion')}>Battalion</button>
          <button onClick={() => scrollToSection('explorer')}>Explorer</button>
          <button onClick={() => scrollToSection('timeline')}>Timeline</button>
          <button onClick={() => scrollToSection('videos')}>Videos</button>
          <button onClick={() => scrollToSection('book')}>Book</button>
          <a href="https://www.ndswm.org" target="_blank" rel="noopener noreferrer">
            National Desert Storm Memorial <ExternalLinkIcon />
          </a>
        </div>
        <div className="footer-bottom">
          <p>A Living History Project • 2-70 Armor "Iron Tigers" • 1st Armored Division</p>
          <p>This site is dedicated to preserving the memory and stories of all who served.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
