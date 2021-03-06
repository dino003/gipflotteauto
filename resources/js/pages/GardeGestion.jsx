import React, { Component } from 'react'

export default class GardeGestion extends Component {
    render() {
        return (
            <div className="app-main__inner">
                        <div className="app-page-title">
                            <div className="page-title-wrapper">
                                <div className="page-title-heading">
                                    <div className="page-title-icon">
                                        <i className="pe-7s-note2 icon-gradient bg-premium-dark">
                                        </i>
                                    </div>
                                    <div>Gestion 
                                        <div className="page-title-subheading">Sélectionnez un onglet dans le panel de gauche pour Ajuster la Gestion de AGOSOFTPARC
                                        </div>
                                    </div>
                                </div>
                                <div className="page-title-actions">
                                    <button type="button" data-toggle="tooltip" title="Example Tooltip" data-placement="bottom" className="btn-shadow mr-3 btn btn-dark">
                                        <i className="fa fa-star"></i>
                                    </button>
                                  
                                </div> 

                         </div>
                        </div>
            </div>
        )
    }
}
