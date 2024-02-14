const especialidades = [
    {
        name: "Cardiology",
        active: true
    },
    {
        name: "Internal Medicine",
        active: true
    },
    {
        name: "Dermatology",
        active: false
    },
    {
        name: "Pediatrics",
        active: true
    },
    {
        name: "Orthopedics",
        active: true
    },
    {
        name: "Sports Medicine",
        active: true
    },
    {
        name: "Neurology",
        active: true
    },
    {
        name: "Psychiatry",
        active: false
    },
    {
        name: "Ophthalmology",
        active: true
    },
    {
        name: "ENT",
        active: true
    },
    {
        name: "Obstetrics",
        active: true
    },
    {
        name: "Gynecology",
        active: true
    },
    {
        name: "Urology",
        active: true
    },
    {
        name: "Nephrology",
        active: false
    },
    {
        name: "Dentistry",
        active: true
    },
    {
        name: "Oral Surgery",
        active: true
    },
    {
        name: "Allergy",
        active: true
    },
    {
        name: "Endocrinology",
        active: true
    },
    {
        name: "Diabetology",
        active: false
    },
    {
        name: "Genetics",
        active: true
    },
    {
        name: "Cosmetic Surgery",
        active: true
    }
]

export const getEspecialidades = () => {  
    return new Promise((res) => {   
      setTimeout(() => {      
        res(especialidades);
      }, 500);
    });
  }
