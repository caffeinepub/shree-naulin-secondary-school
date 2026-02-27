import Text "mo:core/Text";
import Array "mo:core/Array";

actor {
  type NewsArticle = {
    id : Nat;
    title : Text;
    date : Text;
    shortDescription : Text;
    category : Text;
  };

  type Facility = {
    id : Nat;
    name : Text;
    description : Text;
    iconName : Text;
  };

  type PrincipalMessage = {
    name : Text;
    title : Text;
    message : Text;
    imageUrl : Text;
  };

  let newsArticles : [NewsArticle] = [
    {
      id = 1;
      title = "Science Exhibition Success";
      date = "2024-01-15";
      shortDescription = "Students showcased innovative projects at the annual science exhibition.";
      category = "Events";
    },
    {
      id = 2;
      title = "New Library Inauguration";
      date = "2023-11-10";
      shortDescription = "Our new state-of-the-art library has been inaugurated.";
      category = "Facilities";
    },
    {
      id = 3;
      title = "Sports Day Achievements";
      date = "2024-03-05";
      shortDescription = "Students won multiple medals in the inter-school sports competition.";
      category = "Events";
    },
    {
      id = 4;
      title = "Smart Classrooms Launch";
      date = "2023-09-20";
      shortDescription = "Introduction of digital learning tools in classrooms.";
      category = "Facilities";
    },
    {
      id = 5;
      title = "Health Camp Organized";
      date = "2024-02-12";
      shortDescription = "Free health check-up camp for students and staff.";
      category = "Events";
    },
    {
      id = 6;
      title = "Computer Lab Upgrade";
      date = "2023-12-08";
      shortDescription = "New computers and software installed in the computer lab.";
      category = "Facilities";
    },
  ];

  let facilities : [Facility] = [
    {
      id = 1;
      name = "Library";
      description = "Extensive collection of books and digital resources.";
      iconName = "library_icon";
    },
    {
      id = 2;
      name = "Science Lab";
      description = "Well-equipped lab for physics, chemistry, and biology experiments.";
      iconName = "science_lab_icon";
    },
    {
      id = 3;
      name = "Computer Lab";
      description = "Modern computers with high-speed internet access.";
      iconName = "computer_lab_icon";
    },
    {
      id = 4;
      name = "Sports Ground";
      description = "Large ground for various sports activities.";
      iconName = "sports_ground_icon";
    },
    {
      id = 5;
      name = "Auditorium";
      description = "Spacious auditorium for events and performances.";
      iconName = "auditorium_icon";
    },
    {
      id = 6;
      name = "Canteen";
      description = "Hygienic and nutritious food available for students.";
      iconName = "canteen_icon";
    },
    {
      id = 7;
      name = "Medical Room";
      description = "First aid and basic medical facilities for emergencies.";
      iconName = "medical_room_icon";
    },
    {
      id = 8;
      name = "Smart Classrooms";
      description = "Digital classrooms with interactive learning tools.";
      iconName = "smart_classrooms_icon";
    },
  ];

  let principalMessage : PrincipalMessage = {
    name = "Dr. Sushil Sharma";
    title = "Principal";
    message = "Welcome to Shree Naulin Secondary School. Our mission is to provide quality education and holistic development for all students. We are committed to fostering a nurturing and innovative learning environment.";
    imageUrl = "principal_image_url";
  };

  public query ({ caller }) func getNewsArticles() : async [NewsArticle] {
    newsArticles;
  };

  public query ({ caller }) func getFacilities() : async [Facility] {
    facilities;
  };

  public query ({ caller }) func getPrincipalMessage() : async PrincipalMessage {
    principalMessage;
  };
};
