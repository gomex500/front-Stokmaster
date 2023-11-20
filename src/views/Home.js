import React, {useEffect, useState} from "react";
import { configApi } from "../api/configApi";
import {alertas} from "../api/alertas"
import {Btn, Carga, Input} from '../components'
import '../css/home.css'
import marca from '../img/marca.png'
import logo from '../img/logo.png'

import { useDispatch, useSelector } from "react-redux";
import { getPcs } from "../store/slices/pc/pcThunks";
import jsPDF from "jspdf";
import 'jspdf-autotable';

const Home = () =>{


    const [compu, setCompu] = useState(null);
    const [buscando, setBuscando] = useState(false);
    const [pcs, setPCs] = useState(null);

    const [software, setSoftware] = useState([]);
    const [soft, setSoft] = useState('');
    const [hardware, setHardware] = useState([]);
    const [hard, setHard] = useState('');

    //pc
    const [codigoPc, setCodigoPc] = useState('');
    
    const [pcN, setPcN] = useState({
        "Codigo": "",
        "Marca": "Dell",
        "SistemaOperativo": "",
        "Red":"Sin Especificar",
        "Usuarios":0,
        "Actualizaciones":"Sin Actualizacion",
        "Seguridad": "Contraseñas Debil",
        "RegistroEventos":"Monitoreado",
        "Software":[],
        "Hardware": [],
        "Microscopio":{
            "Codigo": "",
            "Modelo": ""
        },
        "Bateria":{
            "Codigo": "",
            "Modelo": ""
        }
    });

    const [edit, setEdit] = useState(false);
    const [ver, setVer] = useState(false);
    const [aux, setAux] = useState(false);
    const [add, setAdd] = useState(false);

    const dispatch = useDispatch();
    const { pc, isLoading } = useSelector( state => state.pc);
    const { user} = useSelector( state => state.user );

    const Ingresarsoftware = () => {
        console.log(software);
        if (soft.length > 0) {
            const aux = [...software];
            aux.push(soft);
            setSoft('');
            setSoftware(aux);
            setPcN({
                ...pcN,
                'Software':aux
            })
        } else {
            alertas('error','campos vacio');
        }
      };

      const eliminarsoftware = (i) => {
        const aux1 = [...software];
        aux1.splice(i, 1);
        setSoftware(aux1);
        setPcN({
            ...pcN,
            'Software':aux1
        })
        alertas('success','Software Eliminado');
      };

      const Ingresarhardware = () => {
        if (hard.length > 0) {
            const aux = [...hardware];
            aux.push(hard);
            setHard('');
            setHardware(aux);
            setPcN({
                ...pcN,
                'Hardware':aux
            })
        } else {
            alertas('error','campos vacio');
        }
      };

      const eliminarhardware = (i) => {
        const aux1 = [...hardware];
        aux1.splice(i, 1);
        setHardware(aux1);
        setPcN({
            ...pcN,
            'Hardware':aux1
        })
        alertas('success','Hardware Eliminado');
      };

    const obtenerPc = (e) =>{
        const {name, value} = e.target;
        setPcN({
            ...pcN,
            [name]:value
        })

        // if (name === "Codigo") {
        //     obtenerPc2(e)
        // }
    }

    // const obtenerPc2 = (e) =>{
    //     const {name, value} = e.target;
    //     if (name === 'Codigo') {
    //         setPcN({
    //             ...pcN,
    //             'Microscopio':{
    //                 ...pcN.Microscopio,
    //                 [name]:`MC-${value}-A`
    //             }
    //         })
    //         setPcN({
    //             ...pcN,
    //             'Bateria':{
    //                 ...pcN.Bateria,
    //                 [name]:`BT-${value}-C`
    //             }
    //         })
    //     }
    // }

    const obtenerMC = (e) =>{
        const {name, value} = e.target
        setPcN({
            ...pcN,
            'Microscopio':{
                ...pcN.Microscopio,
                [name]:value
            }
        })
    }

    const obtenerBateria = (e) =>{
        const {name, value} = e.target
        setPcN({
            ...pcN,
            'Bateria':{
                ...pcN.Bateria,
                [name]:value
            }
        })
    }


    const validarDatos = (e) =>{
        e.preventDefault();
        if (pcN.Codigo === ' '
            // pcN.SistemaOperativo ===' ' ||
            // pcN.bateria.Codigo === ' '||
            // pcN.bateria.Modelo === ' '||
            // pcN.microscopio.Codigo === ' ' ||
            // pcN.microscopio.Modelo === ' '
        ) {
            alertas('error', 'Aun hay campos vacios');
            console.log(pcN);
            // console.log(microscopio);
            // console.log(bateria);
        } else {
            if (edit) {
                updatePc();
            } else {
                enviarPc();
            }
        }
    }

    // const agregarCodigo = (e) =>{
    //     const {name, value} = e.target
    //     setPcN({
    //         ...pcN,
    //         [name]:`PC-${value}-B`
    //     })
    //     setMicroscopio({
    //         ...microscopio,
    //         [name]:`MC-${value}-A`
    //     })
    //     setBateria({
    //         ...bateria,
    //         [name]:`BT-${value}-C`
    //     })
    // }

    const enviarPc = () =>{
        configApi.post('/pc',pcN)
        .then((response) => {
            alertas('success','PC Agregada');
            window.location = "/";
        })
        .catch((error) =>{
            console.log('error',error);
            alertas('error',error.response.data);
        });
    }

    const updatePc = () =>{
        const { _id, ...pcNSinId } = pcN;
        configApi.put(`/pc/${pcN._id}`,pcNSinId)
        .then((response) => {
            alertas('success','PC Actualizada');
            window.location = "/";
        })
        .catch((error) =>{
            console.log('error',error.response);
            alertas('error',error.response.data);
        });
    }

    const verDetalles = (p) =>{
        setCompu(p);
        setVer(true);
        setAux(true);
    }

    const cambiarValor = (e) =>{
        setCodigoPc(e.target.value);
    }

    const cerrar = () =>{
        setVer(false);
        setAux(false);
        setAdd(false);
    }

    const editar = (pc) =>{
        setEdit(true);
        setPcN(pc);
        setHardware(pc.Hardware);
        setSoftware(pc.Software);
        console.log(pc);
        setAdd(true);
        setAux(true);
    }

    const Add = () =>{
        setAdd(true);
        setAux(true);
    }

    const cancelar = () =>{
        setCodigoPc('');
        dispatch( getPcs() );
        setBuscando(false);
    }

    const buscarPc = (e) =>{
        e.preventDefault();
        if(codigoPc){
            configApi.get(`/codigo/${codigoPc}`)
            .then((response) =>{
                setBuscando(true);
                setPCs(response.data[0]);
            })
            .catch((error) =>{
                console.log(error);
                alertas('error', error.response.data.message);
            })
        }else{
            alertas('error', 'campo vacio');
        }
    }

    const eliminarPc = (id) =>{
        configApi.delete(`/pc/${id}`)
            .then(response =>{
                alertas('success', response.data.mensaje)
                dispatch( getPcs() );
            })
            .catch(error =>{
                alertas('error', error)
            })
    }

    const generalPDF2 = () =>{
        const doc = new jsPDF({
            orientation: "portrait",
            unit: "in",
            format: 'letter'
          });

          const fecha = new Date().toLocaleDateString();

          const pageWidth = doc.internal.pageSize.width;
          const pageHeight = doc.internal.pageSize.height;
          doc.addImage(marca, 'JPEG', 0, 0, pageWidth, pageHeight);

          doc.setFont('Time-Roman');
        //   doc.setFontSize(16);
        //   doc.setTextColor("#252525")
          var width = doc.internal.pageSize.getWidth()
        //   doc.text('STOCKSMASTER', 0.5, 0.4);
        //     doc.setFontSize(25);
            doc.setTextColor("#ff9900")
            doc.setFontSize(40);
            doc.text('STOCKMASTER', width/2, 1, {align: 'center'});
            doc.setTextColor("#252525")
            doc.setFontSize(30);
            doc.text(`Reporte General`, width/2, 2, {align: 'center'});
            doc.setFontSize(30);
            doc.setTextColor("#252525")
            // doc.text(`PC:`, width/2, 3.5, {align: 'center'})
            // doc.setTextColor("#ff9900")
            // doc.setFontSize(25)
            // doc.text(p.Codigo, width/2, 4, {align: 'center'})
            // doc.setTextColor("#252525")
            doc.setFontSize(30);
            doc.text(`Fecha:`, width/2, 5, {align: 'center'});
            doc.setTextColor("#ff9900")
            doc.setFontSize(20)
            doc.text(fecha, width/2, 5.5, {align: 'center'});
            doc.setFontSize(30);
            doc.setTextColor("#252525")
            doc.text(`Usuario:`, width/2, 6.5, {align: 'center'});
            doc.setTextColor("#ff9900")
            doc.setFontSize(20)
            doc.text(user.nombre, width/2, 7, {align: 'center'});

            pc.map((p) =>{
                doc.addPage();
            doc.setFontSize(20);
            doc.setTextColor("#252525")
            doc.text(`PC: ${p.Codigo}`, width/2, 1, {align: 'center'});
            const data = [
                ['Codigo', 'Marca', 'Sistema Operativo', 'Actualizaciones'],
                [p.Codigo, p.Marca, p.SistemaOperativo, p.Actualizaciones],
            ];
            // Configurar la tabla
            doc.autoTable({
                head: [data[0]], // Encabezado de la tabla
                body: data.slice(1), // Cuerpo de la tabla (sin el encabezado)
                startY: 1.8, // Ajustar posición vertical de inicio
                styles: { fontSize: 10, textColor: [0, 0, 0], fillColor: '#ff9900', halign: 'center'}, // Ajustar estilo de texto
            });
            const data2 = [
                ['Configuracion de Red', 'Usuarios', 'Seguridad', 'Registro de Eventos'],
                [p.Red, p.Usuarios, p.Seguridad, p.RegistroEventos],
            ];
            // Configurar la tabla
            doc.autoTable({
                head: [data2[0]], // Encabezado de la tabla
                body: data2.slice(1), // Cuerpo de la tabla (sin el encabezado)
                margin: { top: 2 }, 
                styles: { fontSize: 10, textColor: [0, 0, 0], fillColor: '#ff9900',halign: 'center' }, // Ajustar estilo de texto
            });
            const data3 = [];

            // Agregar encabezados
            data3.push([{ content: 'Software' }, { content: 'Hardware'}]);
            
            
            // Rellenar la tabla con datos de ambos arreglos
            for (let i = 0; i < 2; i++) {
                data3.push([p.Software[i] || '', p.Hardware[i] || '']);
            }
            
            // Configurar la tabla
            doc.autoTable({
                head: data3.slice(0, 1), // Encabezado de la tabla
                body: data3.slice(1), // Cuerpo de la tabla (sin el encabezado)
                margin: { top: 2 }, 
                styles: { fontSize: 10, textColor: [0, 0, 0], fillColor: '#ff9900',halign: 'center' }, // Ajustar estilo de texto
            });

            const data4 = [];

            // Agregar encabezados
            data4.push([{ content: 'Software' }, { content: 'Hardware'}]);
            
            // Determinar la longitud máxima entre los dos arreglos
            const maxLength2 = Math.max(p.Software.length, p.Hardware.length);
            
            // Rellenar la tabla con datos de ambos arreglos
            for (let i = 0; i < maxLength2; i++) {
                data4.push([p.Software[i] || '', p.Hardware[i] || '']);
            }
            
            // Configurar la tabla
            doc.autoTable({
                head: data4.slice(0, 1), // Encabezado de la tabla
                body: data4.slice(1), // Cuerpo de la tabla (sin el encabezado)
                margin: { top: 2 }, 
                styles: { fontSize: 10, textColor: [0, 0, 0], fillColor: '#ff9900', halign: 'center'}, // Ajustar estilo de texto
            });

            let data5 = [];

            // Agregar encabezados
            data5.push([
            { content: 'Batería', colSpan: 2, styles: { halign: 'center' } },
            { content: 'Microscopio', colSpan: 2, styles: { halign: 'center' } },
            ]);

            data5.push([
                { content: 'Codigo', styles: { halign: 'center' }},
                { content: 'Modelo', styles: { halign: 'center' }},
                { content: 'Codigo', styles: { halign: 'center' } },
                { content: 'Modelo', styles: { halign: 'center' }},
                ]);

            // Rellenar la tabla con datos de batería y microscopio
            data5.push([p.Bateria.Codigo, p.Bateria.Modelo, p.Microscopio.Codigo, p.Microscopio.Modelo]);

            // Configurar la tabla
            doc.autoTable({
                head: data5.slice(0, 1), // Encabezado de la tabla
                body: data5.slice(1), // Cuerpo de la tabla (sin el encabezado)
                margin: { top: 2 },
                styles: { fontSize: 10, textColor: [0, 0, 0], fillColor: '#ff9900',halign: 'center' }, // Ajustar estilo de texto
            });
            
            
            doc.setTextColor("#252525")
            doc.setFontSize(15);
            doc.text(`StockMaster v1.5 | Freddy Gomez, Jorge Narvaez, Elvin Arana | Gestion de Equipos`, width/2, 10.5, {align: 'center'});
            })
            doc.save("Informe.pdf");
    }

    const generalPDF = () =>{

        const doc = new jsPDF({
            orientation: "portrait",
            unit: "in",
            format: 'letter'
          });

          const fecha = new Date().toLocaleDateString();

          const pageWidth = doc.internal.pageSize.width;
          const pageHeight = doc.internal.pageSize.height;
          doc.addImage(marca, 'JPEG', 0, 0, pageWidth, pageHeight);

          doc.setFont('Time-Roman');
        //   doc.setFontSize(16);
        //   doc.setTextColor("#252525")
          var width = doc.internal.pageSize.getWidth()
        //   doc.text('STOCKSMASTER', 0.5, 0.4);
        //     doc.setFontSize(25);
            doc.setTextColor("#ff9900")
            doc.setFontSize(40);
            doc.text('STOCKMASTER', width/2, 1, {align: 'center'});
            doc.setTextColor("#252525")
            doc.setFontSize(30);
            doc.text(`Reporte Individul`, width/2, 2, {align: 'center'});
            doc.setFontSize(30);
            doc.setTextColor("#252525")
            doc.text(`PC:`, width/2, 3.5, {align: 'center'})
            doc.setTextColor("#ff9900")
            doc.setFontSize(25)
            doc.text(compu.Codigo, width/2, 4, {align: 'center'})
            doc.setTextColor("#252525")
            doc.setFontSize(30);
            doc.text(`Fecha:`, width/2, 5, {align: 'center'});
            doc.setTextColor("#ff9900")
            doc.setFontSize(20)
            doc.text(fecha, width/2, 5.5, {align: 'center'});
            doc.setFontSize(30);
            doc.setTextColor("#252525")
            doc.text(`Usuario:`, width/2, 6.5, {align: 'center'});
            doc.setTextColor("#ff9900")
            doc.setFontSize(20)
            doc.text(user.nombre, width/2, 7, {align: 'center'});
            
            doc.addPage();
            doc.setFontSize(20);
            doc.setTextColor("#252525")
            doc.text(`PC: ${compu.Codigo}`, width/2, 1, {align: 'center'});
            const data = [
                ['Codigo', 'Marca', 'Sistema Operativo', 'Actualizaciones'],
                [compu.Codigo, compu.Marca, compu.SistemaOperativo, compu.Actualizaciones],
            ];
            // Configurar la tabla
            doc.autoTable({
                head: [data[0]], // Encabezado de la tabla
                body: data.slice(1), // Cuerpo de la tabla (sin el encabezado)
                startY: 1.8, // Ajustar posición vertical de inicio
                styles: { fontSize: 10, textColor: [0, 0, 0], fillColor: '#ff9900', halign: 'center'}, // Ajustar estilo de texto
            });
            const data2 = [
                ['Configuracion de Red', 'Usuarios', 'Seguridad', 'Registro de Eventos'],
                [compu.Red, compu.Usuarios, compu.Seguridad, compu.RegistroEventos],
            ];
            // Configurar la tabla
            doc.autoTable({
                head: [data2[0]], // Encabezado de la tabla
                body: data2.slice(1), // Cuerpo de la tabla (sin el encabezado)
                margin: { top: 2 }, 
                styles: { fontSize: 10, textColor: [0, 0, 0], fillColor: '#ff9900',halign: 'center' }, // Ajustar estilo de texto
            });
            const data3 = [];

            // Agregar encabezados
            data3.push([{ content: 'Software' }, { content: 'Hardware'}]);
            
            
            // Rellenar la tabla con datos de ambos arreglos
            for (let i = 0; i < 2; i++) {
                data3.push([compu.Software[i] || '', compu.Hardware[i] || '']);
            }
            
            // Configurar la tabla
            doc.autoTable({
                head: data3.slice(0, 1), // Encabezado de la tabla
                body: data3.slice(1), // Cuerpo de la tabla (sin el encabezado)
                margin: { top: 2 }, 
                styles: { fontSize: 10, textColor: [0, 0, 0], fillColor: '#ff9900',halign: 'center' }, // Ajustar estilo de texto
            });

            const data4 = [];

            // Agregar encabezados
            data4.push([{ content: 'Software' }, { content: 'Hardware'}]);
            
            // Determinar la longitud máxima entre los dos arreglos
            const maxLength2 = Math.max(compu.Software.length, compu.Hardware.length);
            
            // Rellenar la tabla con datos de ambos arreglos
            for (let i = 0; i < maxLength2; i++) {
                data4.push([compu.Software[i] || '', compu.Hardware[i] || '']);
            }
            
            // Configurar la tabla
            doc.autoTable({
                head: data4.slice(0, 1), // Encabezado de la tabla
                body: data4.slice(1), // Cuerpo de la tabla (sin el encabezado)
                margin: { top: 2 }, 
                styles: { fontSize: 10, textColor: [0, 0, 0], fillColor: '#ff9900', halign: 'center'}, // Ajustar estilo de texto
            });

            let data5 = [];

            // Agregar encabezados
            data5.push([
            { content: 'Batería', colSpan: 2, styles: { halign: 'center' } },
            { content: 'Microscopio', colSpan: 2, styles: { halign: 'center' } },
            ]);

            data5.push([
                { content: 'Codigo', styles: { halign: 'center' }},
                { content: 'Modelo', styles: { halign: 'center' }},
                { content: 'Codigo', styles: { halign: 'center' } },
                { content: 'Modelo', styles: { halign: 'center' }},
                ]);

            // Rellenar la tabla con datos de batería y microscopio
            data5.push([compu.Bateria.Codigo, compu.Bateria.Modelo, compu.Microscopio.Codigo, compu.Microscopio.Modelo]);

            // Configurar la tabla
            doc.autoTable({
                head: data5.slice(0, 1), // Encabezado de la tabla
                body: data5.slice(1), // Cuerpo de la tabla (sin el encabezado)
                margin: { top: 2 },
                styles: { fontSize: 10, textColor: [0, 0, 0], fillColor: '#ff9900',halign: 'center' }, // Ajustar estilo de texto
            });
            
            


            doc.setTextColor("#252525")
            doc.setFontSize(15);
            doc.text(`StockMaster v1.5 | Freddy Gomez, Jorge Narvaez, Elvin Arana | Gestion de Equipos`, width/2, 10.5, {align: 'center'});
            // doc.setFontSize(18);
            // doc.setTextColor("#ff9900")
            // doc.text(compu.Codigo,1,2.3);
            // doc.setTextColor("#252525");
            // doc.setFontSize(20);
            // doc.text('Marca:',1,2.6);
            // doc.setFontSize(18);
            // doc.setTextColor("#ff9900")
            // doc.text(compu.Marca,1,2.9);

            doc.save("Informe.pdf");
    }

    useEffect(() => {
        dispatch( getPcs() );
    }, [])


    if (isLoading) {
        return (<Carga/>)
    } else if(user.rol === 1){
        return(
            <div className="container-fluid">
                <div className={aux ? "cont-pcV": "cont-users"} >
                <div className="cont-btn2">
                        <Btn
                            tp={"button"}
                            text={"General Informe"}
                            cls={"btn btn-primary"}
                            fun={generalPDF2}
                        />
                    </div>
                <Btn
                    text={<i class="fa-solid fa-circle-plus"></i>}
                    cls={"btnChat animate__animated animate__bounce"}
                    fun={Add}
                />
                    <center>
                        <h2>Gestión de Equipos</h2>
                        <div className="cont-search">
                            <form onSubmit={buscarPc}>
                                <div className="form-cont">
                                    <Input
                                        tp={'text'}
                                        cls={'form-control input'}
                                        val={codigoPc}
                                        fun={cambiarValor}
                                        ph={'Buscar por username'}
                                    />
                                    <Btn
                                        tp={'submit'}
                                        cls={'btn1'}
                                        text={<i class="fa-solid fa-magnifying-glass"></i>}
                                    />
                                    <Btn
                                        tp={'button'}
                                        cls={'btn1'}
                                        fun={cancelar}
                                        text={(() =>{
                                            if (codigoPc.length > 0) {
                                               return <i class="fa-solid fa-delete-left"></i>
                                            } else {
                                                return <i class="fa-solid fa-rotate"></i>
                                            }
                                        })()}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="cont-tabla table-responsive">
                            <table className="table table-bordered">
                                <thead>
                                    <tr className="table-head">
                                        <th>N#</th>
                                        <th>Codigo</th>
                                        <th>Marca</th>
                                        <th>Sistema Operativo</th>
                                        <th>Microscopio</th>
                                        <th colSpan={"2"}>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="table-body">
                                {!buscando ? (
                                    pc.map((p, i) => (
                                    <tr key={p._id} className="tbody">
                                        <td onClick={() => verDetalles(p)}>{i + 1}</td>
                                        <td onClick={() => verDetalles(p)}>{p.Codigo}</td>
                                        <td onClick={() => verDetalles(p)}>{p.Marca}</td>
                                        <td onClick={() => verDetalles(p)}>{p.SistemaOperativo}</td>
                                        <td onClick={() => verDetalles(p)}>{p.Microscopio === null ? <i class="fa-solid fa-x"></i>: <i class="fa-solid fa-check"></i>}</td>
                                        <td>
                                            <Btn
                                                tp={'button'}
                                                cls={'btn2'}
                                                text={<i className="fa-solid fa-pencil"></i>}
                                                fun={() => editar(p)}
                                            />
                                        </td>
                                        <td>
                                            <Btn
                                                tp={'button'}
                                                cls={'btn2'}
                                                text={<i className="fa-solid fa-trash"></i>}
                                                fun={() => eliminarPc(p._id)}
                                            />
                                        </td>
                                    </tr>
                                    ))
                                ) : (
                                    <tr className="tbody">
                                        <td>{1}</td>
                                        <td onClick={() => verDetalles(pcs)}>{pcs.Codigo}</td>
                                        <td onClick={() => verDetalles(pcs)}>{pcs.Marca}</td>
                                        <td onClick={() => verDetalles(pcs)}>{pcs.SistemaOperativo}</td>
                                        <td onClick={() => verDetalles(pcs)}>{pcs.Microscopio === null ? <i class="fa-solid fa-x"></i>: <i class="fa-solid fa-check"></i>}</td>
                                        <td>
                                            <Btn
                                                tp={'button'}
                                                cls={'btn2'}
                                                text={<i className="fa-solid fa-pencil"></i>}
                                                fun={() => editar(pcs)}
                                            />
                                        </td>
                                        <td>
                                            <Btn
                                                tp={'button'}
                                                cls={'btn2'}
                                                text={<i className="fa-solid fa-trash"></i>}
                                                fun={() => eliminarPc(pcs._id)}
                                            />
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </center>
                </div>
                {ver ? 
                <div className="cont-compu">
                    <Btn
                            cls={"btn btn-primary"}
                            text={<i className="fa-solid fa-circle-xmark"></i>}
                            fun={cerrar}
                        />  
                    <div className="row compu">
                        <h2>{compu.Codigo}</h2>
                        <hr/>
                        <div className="col-md-4 cont-p">
                            <p><span>Marca:</span> {compu.Marca}</p>
                            <p><span>Sistema Operativo:</span> {compu.SistemaOperativo}</p>
                            <p><span>Hardware:</span></p>
                            <ul>
                            {compu.Hardware.map((h, i) =>(
                                <li key={i}>{h}</li>
                            ))}
                            </ul>
                            <p><span>Software:</span></p>
                            <ul>
                            {compu.Software.map((s, i) =>(
                                <li key={i}>{s}</li>
                            ))}
                            </ul>
                            </div>
                            <div className="col-md-4 cont-p">
                            <p><span>Actualizaciones:</span> {compu.Actualizaciones}</p>
                            <p><span>Configuración Red:</span> {compu.Red}</p>
                            <p><span>Usuarios:</span> {compu.Usuarios}</p>
                            <p><span>Seguridad:</span> {compu.Seguridad}</p>
                            <p><span>Registro Eventos:</span> {compu.RegistroEventos}</p>
                            </div>
                            <div className="col-md-4 cont-p">
                            <p><span>Microscopio:</span></p>
                            <ul>
                                <li>
                                    <p><span>Codigo: </span>{compu.Microscopio.Codigo}</p>
                                </li>
                                <li>
                                    <p><span>Modelo: </span>{compu.Microscopio.Modelo}</p>
                                </li>
                            </ul>
                            <p><span>Bateria:</span></p>
                            <ul>
                                <li>
                                    <p><span>Codigo: </span>{compu.Bateria.Codigo}</p>
                                </li>
                                <li>
                                    <p><span>Modelo: </span>{compu.Bateria.Modelo}</p>
                                </li>
                            </ul>
                        </div>
                        <Btn
                            tp={"button"}
                            text={"General Informe"}
                            cls={"btn btn1 btn-primary"}
                            fun={generalPDF}
                        />
                    </div>
                </div> : null}
                {add ? 
                <div className="cont-compu">
                    <Btn
                            cls={"btn btn-primary"}
                            text={<i className="fa-solid fa-circle-xmark"></i>}
                            fun={cerrar}
                        />
                    <div className="cont-Form-pc">
                        <h2>{edit ? 'Actualizar': 'Agregar'} PCs</h2>
                        <form className="row" onSubmit={validarDatos}>
                            <div className="contI col-md-3">
                                <label htmlFor='Codigo'>Codigo PC:</label>
                                    <Input
                                        tp={'text'}
                                        cls={'input1'}
                                        ph={'Codigo'}
                                        nm={'Codigo'}
                                        val={pcN.Codigo}
                                        fun={obtenerPc}
                                    />
                            </div>
                            <div className="contI col-md-3">
                                <label htmlFor="Marca">Marca:</label>
                                    <select name="Marca" onChange={obtenerPc} value={pcN.Marca} className='form-select select2'>
                                        <option value="Dell">Dell</option>
                                        <option value="HP">HP</option>
                                        <option value="Lenovo">Lenovo</option>
                                    </select>
                            </div>
                            <div className="contI col-md-3">
                                <label htmlFor='SistemaOperativo'>Sistema Operativo:</label>
                                    <Input
                                        tp={'text'}
                                        cls={'input1'}
                                        ph={'SistemaOperativo'}
                                        nm={'SistemaOperativo'}
                                        val={pcN.SistemaOperativo}
                                        fun={obtenerPc}
                                    />
                            </div>
                            <div className="contI col-md-3">
                                <label htmlFor="Red">Configuracion Red:</label>
                                    <select name="Red" className='form-select select2' onChange={obtenerPc} value={pcN.Red}>
                                        <option value="Sin Especificar">Sin Especificar</option>
                                    </select>
                            </div>
                            <div className="contI col-md-3">
                                <label htmlFor='Usuarios'>Numero de Usuarios:</label>
                                    <Input
                                        tp={'number'}
                                        cls={'input1'}
                                        ph={'Usuarios'}
                                        nm={'Usuarios'}
                                        val={pcN.Usuarios}
                                        fun={obtenerPc}
                                    />
                            </div>
                            <div className="contI col-md-3">
                                <label htmlFor="RegistroEventos">Registro de Eventos:</label>
                                    <select name="RegistroEventos" className='form-select select2' onChange={obtenerPc} value={pcN.RegistroEventos}>
                                        <option value="Monitoreado">Monitoreado</option>
                                        <option value="No Monitoreado">No Monitoreado</option>
                                    </select>
                            </div>
                            <div className="contI col-md-3">
                                <label htmlFor="Seguridad">Seguridad:</label>
                                    <select name="Seguridad" className='form-select select2' onChange={obtenerPc} value={pcN.Seguridad}>
                                        <option value="Contraseñas Debil">Contraseñas Debil</option>
                                        <option value="Contraseñas Normal">Contraseñas Normal</option>
                                        <option value="Contraseñas Fuerte">Contraseñas Fuerte</option>
                                    </select>
                            </div>
                            <div className="contI col-md-3">
                                <label htmlFor="Actualizaciones">Actualizaciones:</label>
                                    <select name="Actualizaciones" className='form-select select2' onChange={obtenerPc} value={pcN.Actualizaciones}>
                                        <option value="Sin Actualizacion">Sin Actualizacion</option>
                                        <option value="Ultimas Actualizaciones">Ultimas Actualizaciones</option>
                                    </select>
                            </div>
                            <div className="row conta col-md-6">
                            <h3>Bateria</h3>
                            <div className="contI col-md-6">
                                <label htmlFor='Codigo'>Codigo Bateria:</label>
                                    <Input
                                        tp={'text'}
                                        cls={'input1'}
                                        ph={'Codigo'}
                                        nm={'Codigo'}
                                        val={pcN.Bateria.Codigo}
                                        fun={obtenerBateria}
                                    />
                            </div>
                            <div className="contI col-md-6">
                                <label htmlFor='Modelo'>Modelo:</label>
                                    <Input
                                        tp={'text'}
                                        cls={'input1'}
                                        ph={'Modelo'}
                                        nm={'Modelo'}
                                        val={pcN.Bateria.Modelo}
                                        fun={obtenerBateria}
                                    />
                            </div>
                            </div>
                            <div className="row conta col-md-6">
                            <h3>Microscopio</h3>
                            <div className="contI col-md-6">
                                <label htmlFor='Codigo'>Codigo Microscopio:</label>
                                    <Input
                                        tp={'text'}
                                        cls={'input1'}
                                        ph={'Codigo'}
                                        nm={'Codigo'}
                                        val={pcN.Microscopio.Codigo}
                                        fun={obtenerMC}
                                    />
                            </div>
                            <div className="contI col-md-6">
                                <label htmlFor='Modelo'>Modelo:</label>
                                    <Input
                                        tp={'text'}
                                        cls={'input1'}
                                        ph={'Modelo'}
                                        nm={'Modelo'}
                                        val={pcN.Microscopio.Modelo}
                                        fun={obtenerMC}
                                    />
                            </div>
                            </div>
                            <div className="row conta col-md-10">
                            <h3>Software</h3>
                            <div className="contI col-md-6">
                                <label htmlFor='Software'>Ingresar software:</label>
                                    <Input
                                        tp={'text'}
                                        cls={'input1 inputD'}
                                        ph={'Software'}
                                        nm={'Software'}
                                        val={soft}
                                        fun={(e) => setSoft(e.target.value)}
                                    />
                                    <Btn
                                        tp={'button'}
                                        text={<i className="fa-solid fa-circle-plus"></i>}
                                        cls={'btn1'}
                                        fun={Ingresarsoftware}
                                    />
                            </div>
                            <div className="contI col-md-6">
                            {software.length > 0 ? (
                                software.map((s, i) => (
                                    <div key={i}>
                                    <p className="l">{s} <Btn
                                        tp={"button"}
                                        text={<i className="fa-solid fa-trash"></i>}
                                        cls={"btn1"}
                                        fun={() => eliminarsoftware(i)}
                                    /></p>
                                    </div>
                                ))
                                ) : (
                                <h3>No hay datos</h3>
                                )}
                            </div>
                            </div>
                            <div className="row conta col-md-10">
                            <h3>Hardware</h3>
                            <div className="contI col-md-6">
                                <label htmlFor='Hardware'>Ingresar Hardware:</label>
                                    <Input
                                        tp={'text'}
                                        cls={'input1 inputD'}
                                        ph={'Hardware'}
                                        nm={'Hardware'}
                                        val={hard}
                                        fun={(e) => setHard(e.target.value)}
                                    />
                                    <Btn
                                        tp={'button'}
                                        text={<i className="fa-solid fa-circle-plus"></i>}
                                        cls={'btn1'}
                                        fun={Ingresarhardware}
                                    />
                            </div>
                            <div className="contI col-md-6">
                            {hardware.length > 0 ? (
                                hardware.map((s, i) => (
                                    <div key={i}>
                                    <p className="l">{s} <Btn
                                        tp={"button"}
                                        text={<i className="fa-solid fa-trash"></i>}
                                        cls={"btn1"}
                                        fun={() => eliminarhardware(i)}
                                    /></p>
                                    </div>
                                ))
                                ) : (
                                <h3>No hay datos</h3>
                                )}
                            </div>
                            </div>
                            <center>
                                <Btn
                                    tp={'submit'}
                                    text={edit ? 'Editar':'Agregar'}
                                    cls={'btn1'}
                                />
                            </center>
                        </form>
                    </div>
                </div> : null}
            </div>
                
        );
    } else {
        return(
            <div className="container-fluid">
                <div className={ver ? "cont-pcV": "row cont-pc"}>
                    <div className="cont-btn1">
                        <Btn
                            tp={"button"}
                            text={"General Informe"}
                            cls={"btn btn-primary"}
                            fun={generalPDF2}
                        />
                    </div>
                    {pc.length > 0 ? (
                        pc.map((p,i) =>(
                            <div key={i} className="col-md-3 cardPc">
                                <div className="cardPc-head">
                                    <h3>{p.Codigo}</h3>
                                </div>
                                <hr/>
                                <div className="cont-body">
                                    <h4>Marca:</h4>
                                    <p>{p.Marca}</p>
                                    <h4>Sistema Operativo:</h4>
                                    <p>{p.SistemaOperativo}</p>
                                </div>
                                <div className="cont-btn">
                                    <Btn
                                        cls={"btn btn-primary"}
                                        text={<i className="fa-solid fa-eye"></i>}
                                        tp={'button'}
                                        fun={() => verDetalles(p)}
                                    />
                                    {/* <Btn
                                        cls={"btn btn-primary"}
                                        text={<i className="fa-solid fa-pencil"></i>}
                                        tp={'button'}
                                    />
                                    <Btn
                                        cls={"btn btn-primary"}
                                        text={<i className="fa-solid fa-trash"></i>}
                                        tp={'button'}
                                        fun={() => eliminarPc(p._id)}
                                    /> */}
                                </div>
                            </div>
                        ))
                    ) : (<div>No hay Pc</div>)}
                </div>
                {ver ? 
                <div className="cont-compu">
                    <Btn
                            cls={"btn btn-primary"}
                            text={<i className="fa-solid fa-circle-xmark"></i>}
                            fun={cerrar}
                        />  
                    <div className="row compu">
                        <h2>{compu.Codigo}</h2>
                        <hr/>
                        <div className="col-md-4 cont-p">
                            <p><span>Marca:</span> {compu.Marca}</p>
                            <p><span>Sistema Operativo:</span> {compu.SistemaOperativo}</p>
                            <p><span>Hardware:</span></p>
                            <ul>
                            {compu.Hardware.map((h, i) =>(
                                <li key={i}>{h}</li>
                            ))}
                            </ul>
                            <p><span>Software:</span></p>
                            <ul>
                            {compu.Software.map((s, i) =>(
                                <li key={i}>{s}</li>
                            ))}
                            </ul>
                            </div>
                            <div className="col-md-4 cont-p">
                            <p><span>Actualizaciones:</span> {compu.Actualizaciones}</p>
                            <p><span>Configuración Red:</span> {compu.ConfiguraciónRed}</p>
                            <p><span>Usuarios:</span> {compu.Usuarios}</p>
                            <p><span>Seguridad:</span> {compu.Seguridad}</p>
                            <p><span>Registro Eventos:</span> {compu.RegistroEventos}</p>
                            </div>
                            <div className="col-md-4 cont-p">
                            <p><span>Microscopio:</span></p>
                            <ul>
                                <li>
                                    <p><span>Codigo: </span>{compu.Microscopio.Codigo}</p>
                                </li>
                                <li>
                                    <p><span>Modelo: </span>{compu.Microscopio.Modelo}</p>
                                </li>
                            </ul>
                            <p><span>Bateria:</span></p>
                            <ul>
                                <li>
                                    <p><span>Codigo: </span>{compu.Bateria.Codigo}</p>
                                </li>
                                <li>
                                    <p><span>Modelo: </span>{compu.Bateria.Modelo}</p>
                                </li>
                            </ul>
                        </div>
                        <Btn
                            tp={"button"}
                            text={"General Informe"}
                            cls={"btn btn1 btn-primary"}
                            fun={generalPDF}
                        />
                    </div>
                </div> : null}
            </div>
        );
    }
}

export default Home;