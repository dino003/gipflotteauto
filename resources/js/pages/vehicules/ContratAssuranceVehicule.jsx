import React, { Component } from 'react'
import InputMask from 'react-input-mask';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {connect} from 'react-redux'

import today from '../../utils/today'
import inputStyle from '../../utils/inputStyle'
import Select from 'react-select';
import { colourStyles } from '../../utils/Repository';

import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"



 class ContratAssuranceVehicule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            objetEdit: undefined,
            isFormSubmitted: false
        }
      
    }


    // componentDidMount(){
    //     this.setState({
    //         objetEdit: this.props.contrat_assurances.find(contrat => contrat.id == this.props.match.params.contrat_assurance_id)
    //     })
    // } 
   
    setField = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    setFieldVehicule = (vehicule) => {
        this.setState({ vehicule: vehicule.id });
        //console.log(`Option selected:`, selectedOption.code);
      }

      setFieldCompagnie = (compagnie_assurance) => {
        this.setState({ compagnie_assurance: compagnie_assurance.id }, () => {
            const courtier = this.props.tiers.find(ti => ti.id == this.state.compagnie_assurance)
            if(courtier){
                this.courtier.value = courtier.id

            }
        });
      }

    setFieldDateContrat = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        }, () => this.setAutreDate(this.date_contrat.value) );
    }

    setFieldCompagnieEtCourtier = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        }, () => this.courtier.value = this.compagnie_assurance.value );
    }

    checkCompagnie = () => {
        if(this.compagnie_assurance.value !== '') return false
       return true 
    }

    setAutreDate = (date) => {
        this.periode_date_debut.value = date;
        this.date_prise_effet.value = date;

        let h = new Date(date)
        var annee_fin = h.getFullYear() + 1
        var annee = annee_fin.toString()

        var jour = h.getDate() - 1
        var jour1 = jour.toString();

         const date_fin = annee + '-' + (h.getMonth() + 1).toString().padStart(2, 0) + 
         '-' + jour1.padStart(2, 0);

         this.periode_date_fin.value = date_fin
    }



    verificationFormulaire () {
        const objetEdit = this.props.contrat_assurances.find(contrat => contrat.id == this.props.match.params.contrat_assurance_id)

        if(this.date_contrat.value == ''){
            return "La date du contrat est obligatoire !"
        }else if(this.numero_contrat_police.value == ''){
            return "Le numero du contrat ou police est obligatoire !"
        }else if(this.state.compagnie_assurance == undefined && !objetEdit.compagnie_assurance){
          return "La Compagnie d'assurance est obligatoire !"
        }else if(this.state.vehicule == undefined && !this.global.checked && !objetEdit.vehicules){
          return "Le Contrat doit être rattaché à au moins un véhicule \n S'il s'agit d'un contrat global veuillez coher la case contrat global !"
        } else{
            return null
        }
    }



      modifierContratAssurance = (e) => {
        e.preventDefault()

          if(this.verificationFormulaire() == null){
              this.setState({isFormSubmitted: true})
              const objetEdit = this.props.contrat_assurances.find(contrat => contrat.id == this.props.match.params.contrat_assurance_id)

              const contrat = {
                numero_contrat_police: this.numero_contrat_police.value,
                date_contrat: this.date_contrat.value,
                periode_date_debut: this.periode_date_debut.value ,
                periode_date_fin: this.periode_date_fin.value,
                date_prise_effet: this.date_prise_effet.value,
                compagnie_assurance_id: this.state.compagnie_assurance ? this.state.compagnie_assurance : objetEdit.compagnie_assurance.id,
                courtier: this.courtier.value,
                valeur_assuree: this.valeur_assuree.value,
                montant_assuree: this.montant_assuree.value,
                montant_prime: this.montant_prime.value,
                pourcentage_assiete: this.pourcentage_assiete.value,
                montant_franchise: this.montant_franchise.value,
                global: this.global.checked
              }
        

            axios.post('/api/modifier_contrat_assurance/' + objetEdit.id, {
                vehicules: this.global.checked ? null : this.state.vehicule == undefined  ? null : this.state.vehicule,
                contrat_objet: contrat
                })
            .then(response => { 
               const action = {type: "EDIT_CONTRAT_ASSURANCE", value: response.data.contrat_assurance}
                 this.props.dispatch(action)
                 const action2 = {type: "GET_VEHICULE", value: response.data.vehicules}
                 this.props.dispatch(action2)
                this.setState({isFormSubmitted: false})
               this.props.history.goBack();

             
            }).catch(error => {
                this.setState({isFormSubmitted: false})
                 console.log(error) } )
           

          }else{
              //console.log(this.verificationFormulaire())
            //   toast.error(this.verificationFormulaire(), {
            //     position: toast.POSITION.BOTTOM_CENTER
            //   });
            alert(this.verificationFormulaire())
          }
     

      }
    

    render() {
      //  const objetEdit = this.props.contrat_assurances.find(contrat => contrat.id == this.props.match.params.contrat_assurance_id);
        const vehiculeSelect = this.props.vehicules.find(veh => veh.id == this.props.match.params.vehicule_id);
        const objetEdit = vehiculeSelect.contrat_assurance ? vehiculeSelect.contrat_assurance : undefined ;
       if(objetEdit !== undefined){
        return (
            <div className="app-main__inner">
              
                    <div className="main-card mb-3 card">
                        <div className="card-body">
                            <h5 className="card-title">Contrat d'assurance N° <span style={{color: 'red'}}>{objetEdit.numero_contrat_police}</span>
                                                         
                          </h5>
                            <form className="" onChange={this.setField}  onSubmit={this.modifierContratAssurance}>
                          
                               
                                <div className="form-row">

                                {/* <div className="col-md-4">
                 
                                    {this.state.global !== undefined ?    <React.Fragment>
                                  {!this.state.global ?
                                             <label  className=""> Sélection de véhicule</label> :
                                             <label>Contrat global</label> }
                                            { this.state.global ? <input readOnly 
                                            defaultValue="Ce Contrat couvre tous les véhicules"
                                            className="form-control" /> : 
                                     
                                        <Select
                                        
                                        name="vehicule"
                                        isDisabled={true}

                                        placeholder="Selectionnez un véhicule"
                                        noOptionsMessage={() => "Aucun Véhicule pour l'instant"}
                                        options={this.props.vehicules}
                                        getOptionLabel={option => option.immatriculation}
                                        getOptionValue={option => option.id}
                                        onChange={this.setFieldVehicule}
                                        defaultValue={objetEdit.vehicules ? objetEdit.vehicules : null}
                                        styles={colourStyles}
                                      />
                                    }
                                  </React.Fragment> :    <React.Fragment>
                                  {!objetEdit.global ?
                                             <label  className=""> Sélection de véhicule</label> :
                                             <label>Contrat global</label> }
                                            { objetEdit.global ? <input readOnly 
                                            defaultValue="Ce Contrat couvre tous les véhicules"
                                            className="form-control" /> : 
                                     
                                        <Select
                                        name="vehicule"
                                        isDisabled={true}
                                        placeholder="Selectionnez un véhicule"
                                        noOptionsMessage={() => "Aucun Véhicule pour l'instant"}
                                        options={this.props.vehicules}
                                        getOptionLabel={option => option.immatriculation}
                                        getOptionValue={option => option.id}
                                        onChange={this.setFieldVehicule}
                                        defaultValue={objetEdit.vehicules ? objetEdit.vehicules : null}
                                        styles={colourStyles}
                                      />
                                    }
                                  </React.Fragment>}
                                
                                        </div> */}

                                    <div className="col-md-2">
                                        <div className="position-relative form-group">
                                            <label >N° de contrat/Police * </label>
                                            <input name="numero_contrat_police" readOnly  type="text"
                                            onChange={this.setField}
                                            defaultValue={objetEdit.numero_contrat_police}

                                            style={inputStyle}
                                            ref={numero_contrat_police => this.numero_contrat_police = numero_contrat_police}
                                             className="form-control" />
                                             </div>
                                    </div>

                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Date du contrat *</label>
                                            <input name="date_contrat" readOnly  type="date"
                                            style={inputStyle}
                                            defaultValue={objetEdit.date_contrat}

                                            onChange={this.setFieldDateContrat}
                                            ref={date_contrat => this.date_contrat = date_contrat}
                                             className="form-control" />
                                             </div>
                                    </div>

                                    {/* <div className="col-md-2">
                                        <div className="position-relative form-group">
                                            <label >Contrat global ?</label>
                                             </div>
                                    </div>

                                    <div className="col-md-1">
                                        <div className="position-relative form-group">
                                            <input name="global"  type="checkbox"
                                            style={inputStyle}
                                            readOnly
                                            onChange={this.setField}
                                            defaultChecked={objetEdit.global}
                                            ref={global => this.global = global}
                                             />
                                             </div>
                                    </div> */}

                                  
                                </div>

                                <div className="form-row">
                                <div className="col-md-2">
                                        <div className="position-relative form-group">
                                            <label >Période ===></label>
                                           
                                             </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Date de debut *</label>
                                            <input name="periode_date_debut" readOnly  type="date"
                                            style={inputStyle}
                                            readOnly
                                            defaultValue={objetEdit.periode_date_debut}

                                            onChange={this.setField}
                                            ref={periode_date_debut => this.periode_date_debut = periode_date_debut}
                                             className="form-control" />
                                             </div>
                                    </div>

                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Date de fin *</label>
                                            <input name="periode_date_fin" readOnly  type="date"
                                            style={inputStyle}
                                            defaultValue={objetEdit.periode_date_fin}

                                            onChange={this.setField}
                                            ref={periode_date_fin => this.periode_date_fin = periode_date_fin}
                                             className="form-control" />
                                             </div>
                                    </div>

                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Date de prise d'effet *</label>
                                            <input name="date_prise_effet" readOnly  type="date"
                                            style={inputStyle}
                                            onChange={this.setField}
                                            defaultValue={objetEdit.date_prise_effet}

                                            ref={date_prise_effet => this.date_prise_effet = date_prise_effet}
                                             className="form-control" />
                                             </div>
                                    </div>
                                   
                                </div>

                                <div className="form-row">

                                <div className="col-md-3">
                                         <label  className="">Compagnie d'assurance</label>
                                    

                                        <Select
                                        name="compagnie_assurance"
                                        isDisabled={true}

                                        placeholder="Selectionnez la compagnie"
                                        noOptionsMessage={() => "Aucun Tiers pour l'instant"}
                                        options={this.props.tiers}
                                        getOptionLabel={option => option.code}
                                        getOptionValue={option => option.id}
                                        onChange={this.setFieldCompagnie}
                                        defaultValue={objetEdit.compagnie_assurance}
                                        styles={colourStyles}
                                      />
                                
                                        </div>

                                        <div className="col-md-3">
                                         <label  className="">Courtier</label>
                                        <select name="courtier" onChange={this.setField}
                                            ref={courtier => this.courtier = courtier}
                                            defaultValue={objetEdit.courtier.id}
                                            readOnly
                                          className="form-control">
                                              
                                        <option defaultValue={null}></option>

                                        {this.props.tiers.map(tier => 
                                                <option key={tier.id} value={tier.id}>{tier.code} </option>

                                                )}
                                        </select>
                                
                                        </div>
                                    
                                   
                                        <div className="col-md-3">
                                            <label >Valeur assurée</label>

                                            <input name="valeur_assuree"
                                             defaultValue={objetEdit.valeur_assuree}
                                            readOnly
                                            ref={valeur_assuree => this.valeur_assuree = valeur_assuree}
                                              type="number" className="form-control" />
                                        </div>

                                        <div className="col-md-3">
                                            <label >Montant assuré des objets</label>

                                            <input name="montant_assuree"
                                            defaultValue={objetEdit.montant_assuree}
                                            readOnly
                                                onChange={this.setField}
                                            ref={montant_assuree => this.montant_assuree = montant_assuree}
                                              type="number" className="form-control" />
                                        </div>

                                      
                                    </div>
                                 
                                <div className="form-row">
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Montant de la prime</label>
                                            <input name="montant_prime"  type="number"
                                            defaultValue={objetEdit.montant_prime}
                                            readOnly
                                            ref={montant_prime => this.montant_prime = montant_prime}
                                             className="form-control" />
                                             </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Pourcentage assiète</label>

                                            <input name="pourcentage_assiete"
                                            defaultValue={objetEdit.pourcentage_assiete}
                                            readOnly
                                            ref={pourcentage_assiete => this.pourcentage_assiete = pourcentage_assiete}

                                              type="number" className="form-control" /></div>
                                    </div>

                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Montant franchise</label>

                                            <input name="montant_franchise"
                                            defaultValue={objetEdit.montant_franchise}
                                            readOnly
                                            ref={montant_franchise => this.montant_franchise = montant_franchise}

                                              type="number" className="form-control" /></div>
                                    </div>
                                
                                   
                                </div>
                          

                                {/* <button disabled={this.state.isFormSubmitted} type="submit" className="mt-2 btn btn-primary">{this.state.isFormSubmitted ? (<i className="fa fa-spinner fa-spin fa-1x fa-fw"></i>) : 'Enregistrer'}</button> */}
                           
                                <span onClick={() => this.props.history.goBack()}
                                 className="mt-2 btn btn-warning pull-right">Retour</span>
                            </form>
                        </div>
                    </div>
                
                    <ToastContainer autoClose={4000} />
       </div>
        )
       }

        else{
            return ( <span style={{textAlign: 'center'}}>

            <Loader
               
               height={500}
               width={300}
             />
             </span>)
        }
    }
}

const mapStateToProps = state => {
    return {
        vehicules: state.vehicules.items,
        tiers: state.tiers.items,
        vehiculeSeleted: state.vehiculeSeleted.vehicule,
        contrat_assurances: state.contrat_assurances.items
        
    }
  }

export default connect(mapStateToProps)(ContratAssuranceVehicule)
