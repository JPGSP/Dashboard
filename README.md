# Dashboard

Dashboard based in a Restfull API PHP.

Instructions to install.
1. Clone this repository to your machine.
2. After the previous stage is completed, enter in the folder clonated and installing the dependencies.
Use the command : "composer install"
3. Before starting to use the application, please execute the content of the sql file inside this project (folder public/resources).
* It is necessary to modify the content of the variables $location, $user, $pwd in the file Database.php inside the folder app/lib inside this project. Please introduce the values you have configurated in your system.
4. Now you are ready to enjoy.



Instructions to test.

The services used to create this project are located in the following routes:

            /new_records/
            
            /all_data/
            
            /data_time_slot/parameter1/parameter2
            
            /data_from/parameter1
            
            /average_data_time_slot/parameter1/parameter2/parameter3
            
            /max_data_time_slot/parameter1/parameter2/parameter3
            
            /min_data_time_slot/parameter1/parameter2/parameter3

To test them, please use REST client applications as Postman or Insomnia.
