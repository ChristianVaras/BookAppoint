import { useState, useEffect } from "react";
// import DoctorCard from "./DoctorCard";
import { Link, useNavigate } from "react-router-dom";
// import { getDoctorById, getDoctors } from "./MockDoctors";
import { api } from "../../utilities/axios";

function AdminDashboard() {
  


    const [doctors, setDoctors] = useState([]);
    // const [loading, setLoading] = useState(true);
    const [searchInput, setSearchInput] = useState("");
    const navigate = useNavigate();

  useEffect(() => {
   
    api()
      .get("/doctor")
      .then((res) => {
        setDoctors(res.data.doctors);
        console.log(res);
      })
      .catch((e) => console.log(e));
  }, []);


  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  //getDoctorById(1).then(res => console.log(res) ).catch(e => console.log(e))

  const Table = () => {
    return (
      <table className="mx-auto border" style={{ width: "340px" }}>
        <thead>
          <tr>
            <th scope="col">Foto</th>
            <th scope="col">Nombre del profesional</th>
            <th scope="col">Detalle</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor, index) => {
            return (
              <tr className="fw-normal border" key={index}>
                <th>
                  <img
                    className="rounded"
                    style={{ height: "55px", width: "50px" }}
                    src={
                      doctor.gender == "male"
                        ? "https://img.freepik.com/foto-gratis/doctor-brazos-cruzados-sobre-fondo-blanco_1368-5790.jpg?w=2000"
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_VcNrlLvabf6_8efcKV4W_oNFJWuX8U9tbg&usqp=CAU"
                    }
                  />
                </th>
                <td className="align-middle">
                  <span className="ms-2">{doctor.name}</span>
                </td>
                <td className="align-middle">
                  <Link
                    to={`/doctor/${doctor._id}`}
                    style={{ color: "#00BFB2", textDecoration: "none" }}
                  >
                    Ver más
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };
