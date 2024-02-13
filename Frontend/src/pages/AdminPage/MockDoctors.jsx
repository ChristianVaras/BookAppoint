const doctors = [
    {
        medId:1,
        image: "https://img.freepik.com/foto-gratis/doctor-brazos-cruzados-sobre-fondo-blanco_1368-5790.jpg?w=2000",
        name: 'Roberto',
        lastName: 'Lucero',
        matricula: '234566',
        personalId: '23453675',
        especialidad: 'Cardiologo',
        email: 'robertLucero@gmail.com',
        phoneNumber: '654215421',
        birthDay: '06/11/1975',
        gender: 'male',
        address: 'las margaritas 875, Buenos Aires',
        nationality: 'Argentina',
        cp: '5544',
        turno: ["tarde"],
        days: ["martes", "miercoles"]
    },
    {
        medId:2,
        image: "https://docty.co/wp-content/uploads/2021/08/doctores.png",
        name: 'Lucas',
        lastName: 'Palomo',
        matricula: '985861',
        personalId: '59681254',
        especialidad: 'Clinico',
        email: 'lucasPalomo@gmail.com',
        phoneNumber: '986245381',
        birthDay: '23/08/1979',
        gender: 'male',
        address: 'plumas 875, Buenos Aires',
        nationality: 'Argentina',
        cp: '5587',
        turno: ["maniana"],
        days: ["martes", "jueves"]
    },
    {
        medId:3,
        image: "https://uvn-brightspot.s3.amazonaws.com/assets/vixes/btg/curiosidades.batanga.com/files/6-cosas-que-ningun-doctor-puede-hacerte-3.jpg",
        name: 'Martín',
        lastName: 'Orlando',
        matricula: '875485',
        personalId: '58965632',
        especialidad: 'Cardiologo',
        email: 'lauraOrlando@gmail.com',
        phoneNumber: '654215421',
        birthDay: '06/11/1975',
        gender: 'male',
        address: 'las margaritas 875, Buenos Aires',
        nationality: 'Argentina',
        cp: '5084',
        turno: ["tarde"],
        days: ["lunes", "miercoles"]
    }
];

export const getDoctors = () => {
    return new Promise((res) => {
      setTimeout(() => {
        res(doctors);
      }, 500);
    });
  }
export const getDoctorById = (id) => { 
    return doctors.find((doctor) => (doctor.medId == id ? doctor : null));
  }
