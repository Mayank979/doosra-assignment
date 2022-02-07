# doosra-assignment

How to start: 
    1: npm install
    2: npm start

Pages:

    Admin: 
        1:/admin - To set the threshold distance value
    
    Rider:
        1: /rider - To create a new rider
        2 /rider/list - To get a list of all the riders and to check the availability status of the riders
    
    User:
        1: /user - To create a new user
        2: /user/list - To get a list of all the users, to get if a user is currently in a ride and if not
                        then start a ride

    Trips:
        1: /trips - To get a list of all the trips  


Things to follow:
    
    1. A rider won't be assigned a trip if he's not available. He becomes unavailable when he's in a trip.
    2. A new trip cannot be started for a user who is already in a trip. The status of the user trip can be seen
       in /user/list endpoint
    3. Trip can be ended in the /trips page.