import React, { Component } from 'react'
import InputMask from 'react-input-mask';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {connect} from 'react-redux'
import Axios from 'axios';
import inputStyle from '../../utils/inputStyle';




 class AjouterPersonnel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actif: true,
            personne_prioritaire: false,
            statut_chaufeur: false,
            duree_contrat: 'Indéterminé',
            college: 'Indéterminé',
            type_permis: 'B'

        }
    }

    toggleActif = () => {
        this.setState({
        actif: !this.state.actif
        })
    }

    togglePersonnePrioritaire = () => {
        this.setState(prevState => {
            return {personne_prioritaire: !prevState.personne_prioritaire}
        })
    }

    toggleStatutChauffeur = () => {
        this.setState(prevState => {
            return {statut_chaufeur: !prevState.statut_chaufeur}
        })
    }

    setField = (event) => {
      //  this.setState({[e.target.name]: e.target.value})
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }

      setFieldEntiteAffectation = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        }, () => {
            this.nom_entite_affectation.value = this.nomEntiteAffectation()
            // this.contenu_libelle_commande.value = this.LibelleAutoDeCommannde()

        });
    }

    nomEntiteAffectation = () => {
        //  this.libelle_commande.value = this.type_commande.value 
        if (this.entite_affectation != undefined && this.entite_affectation.value != '') {
           var enti = this.props.entites.find(ent => ent.id == this.entite_affectation.value)
           return  enti.nom_entite || null
        }

        return null

    }

      verificationFormulaire () {
          if(this.nom.value == undefined || !this.nom.value.length){
              return "Le Nom est obligatoire !"
          }else if(this.prenom.value == undefined || !this.prenom.value.length){
              return "Le prenom est obligatoire !"
          }else if(this.entite_affectation.value == undefined || !this.entite_affectation.value.length){
            return "L' entité d'affectation est obligatoire !"
          }else{
              return null
          }
      }

      enregistrerPersonnel = (e) => {
        e.preventDefault()
          if(this.verificationFormulaire() == null){
            console.log(this.state)
            axios.post('/api/ajouter_personnel', {
                nom: this.nom.value,
                prenom: this.prenom.value,
                actif: this.state.actif,
                fonction: this.fonction.value,
                matricule: this.matricule.value,
                telephone: this.telephone.value,
                portable: this.portable.value,
                fax: this.fax.value,
                adresse_email: this.adresse_email.value,
                nationalite: this.nationalite.value,
                date_naissance: this.date_naissance.value,
                personne_prioritaire: this.state.personne_prioritaire,
                statut_chaufeur: this.state.statut_chaufeur,
                duree_contrat: this.state.duree_contrat,
                college: this.state.college,
                numero_permis_conduire: this.numero_permis_conduire.value,
                date_delivrance: this.date_delivrance.value,
                lieu_delivrance: this.lieu_delivrance.value,
                type_permis: this.state.type_permis,
                numero_conducteur_pour_gestion_carte: this.numero_conducteur_pour_gestion_carte.value,
                categorie: this.categorie.value,
                entite_affectation: this.entite_affectation.value,
                montant_aen: this.montant_aen.value,
                numero_autorisation_octroye: this.numero_autorisation_octroye.value,
                nom_entite_affectation: this.nom_entite_affectation.value,
                date_autorisation: this.date_autorisation.value
            }).then(response => {
                
               const action = {type: "ADD_PERSONNEL", value: response.data}
               this.props.dispatch(action)

             this.props.history.push('/gestion_du_personnel')
            }).catch(error => console.log(error))

          }else{
              //console.log(this.verificationFormulaire())
              toast.error(this.verificationFormulaire(), {
                position: toast.POSITION.BOTTOM_CENTER
              });
          }
      }
    

    render() {
        const {param_personnels, entites} = this.props
        return (
            <div className="app-main__inner">
                    {param_personnels &&
                    <div className="main-card mb-3 card">
                        <div className="card-body"><h5 className="card-title">Fichier du personnel</h5>
                            <form className="" onChange={this.setField} onSubmit={this.enregistrerPersonnel}>
                                <div className="form-row">
                                    <div className="col-md-5">
                                        <div className="position-relative form-group">
                                            <label >Nom</label>
                                            <input name="nom"
                                            ref={nom => this.nom = nom}
                                            style={inputStyle}
                                              type="text" className="form-control" /></div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="position-relative form-group">
                                            <label >Prénom</label>
                                            <input name="prenom"
                                            style={inputStyle}

                                            ref={prenom => this.prenom = prenom}
                                              type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="position-relative form-group">
                                            <label className="form-check-label">
                                            Décochez si inactif  <input type="checkbox"
                                             onChange={this.setField}
                                             checked={this.state.actif}
                                               name="actif"  className="" /> </label>
                                        </div>
                                    </div>
                                </div>
                                    <div className="form-row">
                                        <div className="col-md-4">
                                    <label  className="">Entité d'affectation</label>
                                        <select name="entite_affectation" 
                                        style={inputStyle}
                                        onChange={this.setFieldEntiteAffectation}
                                        ref={entite_affectation => this.entite_affectation = entite_affectation}
                                         className="form-control">
                                            <option value={null}></option>
                                            {entites.map((ent, index) => 
                                             <option key={ent.id} value={ent.id}>{ent.entite}</option>

                                                )}
                                        </select>
                                
                                        </div>
                                        <div className="col-md-8">
                                            <label >Entité d'affectation</label>

                                            <input name="nom_entite_affectation"
                                        style={inputStyle}
                                            ref={nom_entite_affectation => this.nom_entite_affectation = nom_entite_affectation}
                                             readOnly type="text" className="form-control" />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                    <div className="col-md-5">
                                        <div className="position-relative form-group">
                                            <label >Fonction</label>
                                            <input name="fonction" 
                                             style={param_personnels.fonction ? inputStyle : null}
                                             required={param_personnels.fonction}
                                            ref={fonction => this.fonction = fonction}
                                             type="text" className="form-control" /></div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Matricule</label>
                                            <input name="matricule"
                                             style={param_personnels.matricule_obligatoire ? inputStyle : null}
                                             required={param_personnels.matricule_obligatoire}
                                            ref={matricule => this.matricule = matricule}
                                             type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                    <div className="position-relative form-group">
                                            <label >Nom de la boite aux lettres de messagerie</label>
                                            <input name="adresse_email"
                                            style={param_personnels.boite_lettre ? inputStyle : null}
                                            required={param_personnels.boite_lettre}
                                            ref={adresse_email => this.adresse_email = adresse_email}
                                              type="text" className="form-control" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="col-md-5">
                                        <div className="position-relative form-group">
                                            <label >Télephonne</label>
                                            <input name="telephone"
                                            ref={telephone => this.telephone = telephone}
                                              type="text" className="form-control" /></div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Portable</label>
                                            <input name="portable"
                                            ref={portable => this.portable = portable}
                                             type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                    <div className="position-relative form-group">
                                            <label >Fax</label>
                                            <input name="fax"
                                            ref={fax => this.fax = fax}
                                             type="text" className="form-control" />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Nationnalité</label>
                                            <input name="nationalite"
                                            ref={nationalite => this.nationalite = nationalite}
                                              type="text" className="form-control" /></div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >date de naissance</label>
                                            <input name="date_naissance"
                                            ref={date_naissance => this.date_naissance = date_naissance}
                                             type="date" className="form-control" />
                                           {/* <InputMask name="date_naissance" className="form-control" mask="99/99/9999" /> */}
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                    <div className="position-relative form-group">
                                            <label className="">
                                            Personne prioritaire (pour reservation) 
                                             <input type="checkbox"
                                              onChange={this.setField}
                                               checked={this.state.personne_prioritaire}

                                               ref={personne_prioritaire => this.personne_prioritaire = personne_prioritaire}
                                                name="personne_prioritaire" className="" /> </label>
                                        </div>
                                    </div>

                                    <div className="col-md-2">
                                        <div className="position-relative form-group">
                                            <label className="form-check-label">
                                            Cette personne a un statut de chauffeur 
                                             <input type="checkbox"
                                             ref={statut_chaufeur => this.statut_chaufeur = statut_chaufeur}
                                               onChange={this.setField}
                                                checked={this.state.statut_chaufeur} 
                                                 name="statut_chaufeur" className="" /></label>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-row">
                                   
                                    <div className="col-md-6">
                                        <div className="position-relative form-group">
                                            <label className="center">Durée du contrat</label>
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                    <div className="position-relative form-group">
                                            <label className="">
                                            Indéterminé  <input type="radio"
                                             name="duree_contrat"
                                             onChange={this.setField}
                                             checked={this.state.duree_contrat === "Indéterminé"}

                                              value="Indéterminé"
                                               className="" /> </label>
                                        </div>
                                    </div>

                                    <div className="col-md-2">
                                        <div className="position-relative form-group">
                                            <label className="form-check-label">
                                            Déterminé  <input type="radio"
                                            onChange={this.setField}
                                             name="duree_contrat"
                                             checked={this.state.duree_contrat === "Déterminé"}

                                              value="Déterminé" className="" /></label>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-row">
                                   
                                   <div className="col-md-3">
                                       <div className="position-relative form-group">
                                           <label className="center">Collège</label>
                                       </div>
                                   </div>
                                   <div className="col-md-2">
                                   <div className="position-relative form-group">
                                           <label className="">
                                           Indéterminé  <input type="radio"
                                            name="college" 
                                             value="Indéterminé"
                                            onChange={this.setField}
                                            checked={this.state.college === "Indéterminé"}
                                             className="" /> </label>
                                       </div>
                                   </div>

                                   <div className="col-md-2">
                                       <div className="position-relative form-group">
                                           <label className="form-check-label">
                                           Cadre  <input type="radio"
                                           onChange={this.setField}
                                           checked={this.state.college === "Cadre"}
                                            name="college"
                                            value="Cadre" className="" /></label>
                                       </div>
                                   </div>
                                   <div className="col-md-2">
                                       <div className="position-relative form-group">
                                           <label className="form-check-label">
                                           Non Cadre  <input type="radio" name="college"
                                           onChange={this.setField}
                                           checked={this.state.college === "Non Cadre"}
                                            value="Non Cadre" className="" /></label>
                                       </div>
                                   </div>
                                   <div className="col-md-3">
                                       <div className="position-relative form-group">
                                           <label className="form-check-label">
                                           Non Cadre, Fait office de cadre  <input type="radio"
                                            value="Non Cadre, fait office de Cadre"
                                            checked={this.state.college === "Non Cadre, fait office de Cadre"}
                                            onChange={this.setField}
                                             name="college" className="" /></label>
                                       </div>
                                   </div>
                               </div>

                               <div className="form-row">
                                    <div className="col-md-5">
                                        <div className="position-relative form-group">
                                            <label >Numero du permis de conduire</label>
                                            <input name="numero_permis_conduire"
                                             style={param_personnels.info_permis ? inputStyle : null}
                                             required={param_personnels.info_permis}
                                            ref={numero_permis_conduire => this.numero_permis_conduire = numero_permis_conduire}
                                              type="text"
                                               className="form-control" /></div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Date de délivrance</label>
                                            <input name="date_delivrance"
                                            style={param_personnels.info_permis ? inputStyle : null}
                                            required={param_personnels.info_permis}
                                            ref={date_delivrance => this.date_delivrance = date_delivrance}
                                             type="date"  className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                    <div className="position-relative form-group">
                                            <label >Lieu de délivrance</label>
                                            <input name="lieu_delivrance"
                                            style={param_personnels.info_permis ? inputStyle : null}
                                             required={param_personnels.info_permis}
                                            ref={lieu_delivrance => this.lieu_delivrance = lieu_delivrance}
                                              type="text" className="form-control" />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-row">
                                   
                                   <div className="col-md-3">
                                       <div className="position-relative form-group">
                                           <label className="center">Type de Permis</label>
                                       </div>
                                   </div>
                                   <div className="col-md-1">
                                   <div className="position-relative form-group">
                                           <label className="">
                                           A1  <input type="radio"
                                             onChange={this.setField}
                                             checked={this.state.type_permis === "A1"}

                                            name="type_permis" value="A1"  className="" /> </label>
                                       </div>
                                   </div>

                                   <div className="col-md-1">
                                       <div className="position-relative form-group">
                                           <label className="form-check-label">
                                           A  <input type="radio" name="type_permis"
                                            onChange={this.setField}
                                            checked={this.state.type_permis === "A"}
                                            value="A" className="" /></label>
                                       </div>
                                   </div>
                                   <div className="col-md-1">
                                       <div className="position-relative form-group">
                                           <label className="form-check-label">
                                           B  <input type="radio" name="type_permis"
                                           
                                                onChange={this.setField}
                                                checked={this.state.type_permis === "B"}
                                            value="B" className="" /></label>
                                       </div>
                                   </div>
                                   <div className="col-md-1">
                                       <div className="position-relative form-group">
                                           <label className="form-check-label">
                                           C  <input type="radio" name="type_permis"
                                             onChange={this.setField}
                                             checked={this.state.type_permis === "C"}
                                            value="C" className="" /></label>
                                       </div>
                                   </div>
                                   <div className="col-md-1">
                                       <div className="position-relative form-group">
                                           <label className="form-check-label">
                                           C1  <input type="radio" name="type_permis"
                                             onChange={this.setField}
                                             checked={this.state.type_permis === "C1"}
                                            value="C1" className="" /></label>
                                       </div>
                                   </div>
                                   <div className="col-md-1">
                                       <div className="position-relative form-group">
                                           <label className="form-check-label">
                                           D  <input type="radio" name="type_permis"
                                              onChange={this.setField}
                                              checked={this.state.type_permis === "D"}
                                            value="D" className="" /></label>
                                       </div>
                                   </div>
                                   <div className="col-md-1">
                                       <div className="position-relative form-group">
                                           <label className="form-check-label">
                                           E  <input type="radio"
                                              onChange={this.setField}
                                              checked={this.state.type_permis === "E"}
                                            name="type_permis" value="E" className="" /></label>
                                       </div>
                                   </div>
                                   <div className="col-md-1">
                                       <div className="position-relative form-group">
                                           <label className="form-check-label">
                                           F  <input type="radio" name="type_permis"
                                              onChange={this.setField}
                                              checked={this.state.type_permis === "F"}
                                            value="F" className="" /></label>
                                       </div>
                                   </div>
                                   <div className="col-md-1">
                                       <div className="position-relative form-group">
                                           <label className="form-check-label">
                                           BCDE  <input type="radio" name="type_permis"
                                              onChange={this.setField}
                                              checked={this.state.type_permis === "BCDE"}
                                            value="BCDE" className="" /></label>
                                       </div>
                                   </div>
                               </div>

                               <div className="form-row">
                                    <div className="col-md-5">
                                        <div className="position-relative form-group">
                                            <label >Numero du conducteur (pour la gestion des cartes)</label>
                                            <input name="numero_conducteur_pour_gestion_carte"
                                            ref={numero_conducteur_pour_gestion_carte => this.numero_conducteur_pour_gestion_carte = numero_conducteur_pour_gestion_carte}
                                             type="text" className="form-control" /></div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="position-relative form-group">
                                            <label >Catégorie de véhicule associé au statut de la personne</label>
                                            <select name="categorie"
                                            ref={categorie => this.categorie = categorie}
                                             className="form-control">
                                            <option ></option>
                                        </select>                                        
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                    <div className="position-relative form-group">
                                            <label >Montant AEN</label>
                                            <input name="montant_aen"
                                            ref={montant_aen => this.montant_aen = montant_aen}
                                              type="text" className="form-control" />
                                        </div>
                                    </div>
                                </div>

                                
                               <div className="form-row">
                                    <div className="col-md-5">
                                        <div className="position-relative form-group">
                                            <label >Autorisation d'utilisation de son véhicule personnel 
                                                pour des trajets professionnels
                                            </label>
                                           
                                             </div>
                                    </div>
                                    <div className="col-md-4">
                                    <div className="position-relative form-group">
                                            <label >N° autorisation octroyé</label>
                                            <input name="numero_autorisation_octroye"
                                            ref={numero_autorisation_octroye => this.numero_autorisation_octroye = numero_autorisation_octroye}
                                              type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                    <div className="position-relative form-group">
                                            <label >Date de l'autorisation</label>
                                            <input name="date_autorisation"
                                            ref={date_autorisation => this.date_autorisation = date_autorisation}
                                              type="date" className="form-control" />
                                        </div>
                                    </div>
                                </div>

                                <button type="submit" className="mt-2 btn btn-primary">Enregistrer</button>
                           
                                <span onClick={() => this.props.history.goBack()}
                                 className="mt-2 btn btn-warning pull-right">Retour</span>
                            </form>
                        </div>
                    </div> }
                
                    <ToastContainer autoClose={8000} />
       </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        entites: state.entites.items,
        param_personnels: state.param_personnels.items,

    }
  }

export default connect(mapStateToProps)(AjouterPersonnel)