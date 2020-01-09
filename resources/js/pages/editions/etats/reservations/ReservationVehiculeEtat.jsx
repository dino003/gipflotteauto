import React, { Component } from 'react'
import { connect } from 'react-redux'

import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import today from '../../../../utils/today';
import moment from 'moment';
import { groupBy, calculSommeColonne, formatageNombre, formatageSomme, calculSommeColonneSommeIntervention } from '../../../../utils/Repository'
import VehiculeEtatForm from '../../forms/VehiculeEtatForm';

import jsPDF from 'jspdf';
import 'jspdf-autotable';

const red = {
    color: 'red'
}

 const calculSommeColonneConsommation = (tableau) => {
    return tableau.reduce( (prec, curr) =>  parseFloat(prec) + parseFloat(curr.montant_ttc || 0), 0)
  } 





class ReservationVehiculeEtat extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            inputOpen: false,
            show: false,
            isFormOpened: false,
            reservations: [],
            loading: false,
        }


    }


    componentDidMount() {

    }



    handleChange = (e) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    createP = () => {
        // console.log(etatVehiculeConsommation[0])
        // var doc = new jsPDF('l');
        var doc = new jsPDF('l', 'pt', 'a3');

        doc.autoTable({
            html: '#export',
            theme: 'grid'
        });
        //doc.autoTable({startY: 30, head: this.headRows(), body: this.bodyRows(25)});
        //   for (var j = 0; j < etatVehiculeConsommation.length; j++) {
        //     doc.autoTable({
        //       //  head: headRows(), 
        //         head: [['Date de Début', 'Heure', 'Date de fin', 'Heure', 'Kms cmptr', 'Kms Parcourus', 'But de l\'utilisation', 'Départ', 'Destination']],
        //         body: etatVehiculeConsommation[0],
        //         startY: doc.autoTable.previous.finalY + 10,
        //         pageBreak: 'avoid',
        //     });
        // }
        //  doc.save('table.pdf');
        //  doc.output('dataurlnewwindow');
        // doc.output('datauri');              //opens the data uri in current window
        window.open(doc.output('bloburl'), '_blank')



    }



    toggleForm = () => {
        this.setState({ isFormOpened: !this.state.isFormOpened })
    }



    render() {

        const etatVehiculeConsommation = this.props.reservations.length ? groupBy(this.props.reservations.filter(reser => !reser.abandonne), 'vehicule_id') : []
        // const etatVehiculeConsommation = etats.sort(function (a, b) {
        //     // Turn your strings into dates, and then subtract them
        //     // to get a value that is either negative, positive, or zero.
        //     return new Date(a.date_conso) - new Date(b.date_conso);
        // });
        const { isFormOpened } = this.state

        return (
            <div className="">
                <br /><br /><br /><br />
                <div className="row">
                    <div className="col-lg-12">
                        <div className="main-card mb-3 card">
                            <div className="card-body ">
                                <h5 className="card-title">
                                    <span className="pull-right">
                                        <button className="mb-2 mr-2 btn-transition btn btn-outline-warning" onClick={() => this.props.history.goBack()}>Retour</button>

                                        {etatVehiculeConsommation.length ? <React.Fragment>
                                            <button title={!isFormOpened ? 'Affinner' : 'Revenir aux Etats'}
                                                className={!isFormOpened ? 'mb-2 mr-2 btn-transition btn btn-outline-primary' : 'mb-2 mr-2 btn-transition btn btn-outline-warning'}
                                                onClick={this.toggleForm}
                                            >
                                                <i className={!isFormOpened ? 'fa fa-plus' : 'fa fa-times'}></i> {' '}

                                                {!isFormOpened ? 'Affinner' : 'Quitter'}
                                            </button>



                                            <ReactHTMLTableToExcel
                                                id="test-table-xls-button"
                                                className="mb-2 mr-2 btn-transition btn btn-outline-success"
                                                table="export"
                                                filename="Liste des reservations des véhicules"
                                                sheet="feuille1"
                                                buttonText="Ecran -> Excel" />

                                            <button className="mb-2 mr-2 btn-transition btn btn-outline-info" onClick={this.createP}>Imprimer</button>
                                        </React.Fragment> : null}
                                    </span>
                                </h5>


                                {etatVehiculeConsommation.length ? <React.Fragment>

                                {isFormOpened ? <VehiculeEtatForm /> :
                                    <table className="mb-0 table table-bordered " id="export">
                                        {etatVehiculeConsommation.map((etatCourant, index) => <React.Fragment key={index} >
                                            <thead>
                                                <tr >
                                                    <th colSpan="6">{this.props.info_societe ? `${this.props.info_societe.societe.toUpperCase()} Etat de Réservations des véhicules` : 'AGOSOFTPARC Etat des Réservations des véhicules'}</th>
                                                    <th colSpan="2">DATE: {moment(today).format('DD/MM/YYYY')}</th>
                                                    {/* <th colSpan="2">Référence: PA 00058</th> */}
                                                </tr>

                                                <tr style={{ backgroundColor: 'gray' }}>
                                                    <th colSpan="12">Véhicule: {etatCourant[0].vehicule ? etatCourant[0].vehicule.immatriculation : null} </th>
                                                </tr>


                                            </thead>



                                            <tbody>
                                                <tr>
                                                    <th >Véhicule </th>
                                                    <th>Du</th>
                                                    <th>Au </th>
                                                    <th>Durée en H</th>

                                                    <th>Réservant: Entité</th>
                                                    <th>Réservant: Personne </th>
                                                    <th>Objet </th>
                                               



                                                </tr>
                                            </tbody>

                                            {etatCourant.map((reser, index) => <tbody key={index}>
                                                <tr>
                                                <td >{reser.vehicule ? reser.vehicule.immatriculation : null}</td>
                                                <td>{ reser.date_debut_reservation ? moment(reser.date_debut_reservation).format('DD/MM/YYYY') : null}</td>
                                                  
                                                    <td>{ reser.date_fin_reservation ? moment(reser.date_fin_reservation).format('DD/MM/YYYY') : null}</td>
                                                    <td >{ parseInt(Math.abs(new Date(reser.date_fin_reservation) - new Date(reser.date_debut_reservation)) / 36e5 )}</td>

                                                    <td >{reser.entite_personne_reservant ? reser.entite_personne_reservant : 'SIEGE'}</td>
                                                    <td >{reser.personne_reservant ? `${reser.personne_reservant.prenom.slice(0, 15) } ${reser.personne_reservant.nom.slice(0, 15)}` : reser.personne_reservant && reser.personne_reservant.defaut ? 'PERSONNE PAR DEFAUT' : null}</td>
                                                    <td >{reser.objet_reservation ? reser.objet_reservation.libelle : null}</td>

                                                </tr>

                                                {etatCourant[etatCourant.length - 1].id == reser.id ?
                                                    <tr style={{ backgroundColor: 'yellow' }}>
                                                        <th colSpan="6">Nombre de ligne de reéservations du véhicule <span style={red}><em >{etatCourant[0].vehicule.immatriculation}</em></span> ( {etatCourant.length.toString().length == 1 ? `0${etatCourant.length}` : etatCourant.length} )</th>

                                                    </tr> : null}

                                            </tbody>)}

                                        </React.Fragment>)}
                                    </table>}

                                    </React.Fragment> : <p style={{ textAlign: 'center' }}><span>
                                            Aucune donnée trouvée
                                    </span> </p>}
                            
                            
                            
                            
                            </div>
                    </div>
                </div>
            </div>



            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        info_societe: state.info_societe.items,
        reservations: state.reservations.items,


    }
}

export default connect(mapStateToProps)(ReservationVehiculeEtat)

