const medicos = [
    {
        name: "John Smith",
        email: "johnsmith@example.com",
        password: "password123",
        license: "ABC123",
        phoneNumber: "+1 (123) 456-7890",
        specialties: ["Cardiology"],
        active: true
    },
    {
        name: "Sarah Johnson",
        email: "sarahjohnson@example.com",
        password: "pass1234",
        license: "DEF456",
        phoneNumber: "+1 (234) 567-8901",
        specialties: ["Dermatology"],
        active: false
    },
    {
        name: "Michael Williams",
        email: "michaelwilliams@example.com",
        password: "doctorpass",
        license: "GHI789",
        phoneNumber: "+1 (345) 678-9012",
        specialties: ["Orthopedics"],
        active: true
    },
    {
        name: "Emily Brown",
        email: "emilybrown@example.com",
        password: "secure123",
        license: "JKL012",
        phoneNumber: "+1 (456) 789-0123",
        specialties: ["Neurology"],
        active: true
    },
    {
        name: "Daniel Wilson",
        email: "danielwilson@example.com",
        password: "danielpass",
        license: "MNO345",
        phoneNumber: "+1 (567) 890-1234",
        specialties: ["Ophthalmology"],
        active: false
    },
    {
        name: "Olivia Davis",
        email: "oliviadavis@example.com",
        password: "oliviapass",
        license: "PQR678",
        phoneNumber: "+1 (678) 901-2345",
        specialties: ["Obstetrics"],
        active: true
    },
    {
        name: "Matthew Thompson",
        email: "matthewthompson@example.com",
        password: "mattpass123",
        license: "STU901",
        phoneNumber: "+1 (789) 012-3456",
        specialties: ["Urology"],
        active: true
    },
    {
        name: "Ava Martinez",
        email: "avamartinez@example.com",
        password: "avapassword",
        license: "VWX234",
        phoneNumber: "+1 (890) 123-4567",
        specialties: ["Pediatrics"],
        active: false
    },
    {
        name: "Ethan Taylor",
        email: "ethantaylor@example.com",
        password: "ethanpass",
        license: "YZA567",
        phoneNumber: "+1 (901) 234-5678",
        specialties: ["Dentistry"],
        active: true
    },
    {
        name: "Sophia Garcia",
        email: "sophiagarcia@example.com",
        password: "sophiapass",
        license: "BCD890",
        phoneNumber: "+1 (012) 345-6789",
        specialties: ["Dermatology"],
        active: true
    },
    {
        name: "Jacob Hernandez",
        email: "jacobhernandez@example.com",
        password: "jacobpass",
        license: "EFG123",
        phoneNumber: "+1 (123) 456-7890",
        specialties: ["Endocrinology"],
        active: false
    },
    {
        name: "Mia Martinez",
        email: "miamartinez@example.com",
        password: "miamia",
        license: "HIJ456",
        phoneNumber: "+1 (234) 567-8901",
        specialties: ["Cardiology"],
        active: true
    },
    {
        name: "Benjamin Thompson",
        email: "benthompson@example.com",
        password: "benthomp",
        license: "KLM789",
        phoneNumber: "+1 (345) 678-9012",
        specialties: ["Neurology"],
        active: true
    },
    {
        name: "Harper White",
        email: "harperwhite@example.com",
        password: "harperw",
        license: "NOP012",
        phoneNumber: "+1 (456) 789-0123",
        specialties: ["Orthopedics"],
        active: false
    },
    {
        name: "William Davis",
        email: "williamdavis@example.com",
        password: "williamd",
        license: "QRS345",
        phoneNumber: "+1 (567) 890-1234",
        specialties: ["Ophthalmology"],
        active: true
    },
    {
        name: "Scarlett Moore",
        email: "scarlettmoore@example.com",
        password: "scarlett",
        license: "TUV678",
        phoneNumber: "+1 (678) 901-2345",
        specialties: ["Obstetrics"],
        active: true
    },
    {
        name: "Samuel Thompson",
        email: "samuelthompson@example.com",
        password: "samuel",
        license: "WXY901",
        phoneNumber: "+1 (789) 012-3456",
        specialties: ["Urology"],
        active: false
    },
    {
        name: "Chloe Allen",
        email: "chloeallen@example.com",
        password: "chloeall",
        license: "ZAB234",
        phoneNumber: "+1 (890) 123-4567",
        specialties: ["Pediatrics"],
        active: true
    },
    {
        name: "Alexander Turner",
        email: "alexturner@example.com",
        password: "alexturn",
        license: "CDE567",
        phoneNumber: "+1 (901) 234-5678",
        specialties: ["Dentistry"],
        active: true
    },
    {
        name: "Victoria Adams",
        email: "victoriaadams@example.com",
        password: "victoria",
        license: "FGH890",
        phoneNumber: "+1 (012) 345-6789",
        specialties: ["Dermatology"],
        active: false
    },
    {
        name: "Andrew Martin",
        email: "andrewmartin@example.com",
        password: "andrewmart",
        license: "IJK123",
        phoneNumber: "+1 (123) 456-7890",
        specialties: ["Endocrinology"],
        active: true
    },
    {
        name: "Penelope Hill",
        email: "penelopehill@example.com",
        password: "penelope",
        license: "LMN456",
        phoneNumber: "+1 (234) 567-8901",
        specialties: ["Cardiology"],
        active: true
    },
    {
        name: "Logan Allen",
        email: "loganallen@example.com",
        password: "loganall",
        license: "OPQ789",
        phoneNumber: "+1 (345) 678-9012",
        specialties: ["Neurology"],
        active: false
    },
    {
        name: "Harper Foster",
        email: "harperfoster@example.com",
        password: "harperf",
        license: "RST012",
        phoneNumber: "+1 (456) 789-0123",
        specialties: ["Orthopedics"],
        active: true
    },
    {
        name: "Noah Wilson",
        email: "noahwilson@example.com",
        password: "noahw",
        license: "UVW345",
        phoneNumber: "+1 (567) 890-1234",
        specialties: ["Ophthalmology"],
        active: true
    },
    {
        name: "Ava Carter",
        email: "avacarter@example.com",
        password: "avac",
        license: "XYZ678",
        phoneNumber: "+1 (678) 901-2345",
        specialties: ["Obstetrics"],
        active: false
    },
    {
        name: "Isaac Adams",
        email: "isaacadams@example.com",
        password: "isaaca",
        license: "BCD901",
        phoneNumber: "+1 (789) 012-3456",
        specialties: ["Urology"],
        active: true
    },
    {
        name: "Grace Turner",
        email: "graceturner@example.com",
        password: "graceturn",
        license: "EFG234",
        phoneNumber: "+1 (890) 123-4567",
        specialties: ["Pediatrics"],
        active: true
    },
    {
        name: "Henry Parker",
        email: "henryparker@example.com",
        password: "henryp",
        license: "HIJ567",
        phoneNumber: "+1 (901) 234-5678",
        specialties: ["Dentistry"],
        active: false
    },
    {
        name: "Isabella Rodriguez",
        email: "isabellarodriguez@example.com",
        password: "isabellar",
        license: "ABC234",
        phoneNumber: "+1 (234) 567-8901",
        specialties: ["Dermatology"],
        active: true
    }
]

export const getMedicos = () => {  
    return new Promise((res) => {   
      setTimeout(() => {      
        res(medicos);
      }, 500);
    });
  }
