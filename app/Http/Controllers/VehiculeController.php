<?php

namespace App\Http\Controllers;

use App\Vehicule;
use Illuminate\Http\Request;
use App\Repositories\Repository;

class VehiculeController extends Controller
{
    protected $model;

    public function __construct(Vehicule $vehicule){
        $this->model = new Repository($vehicule);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       // return $this->model->get();
        $vehicules = Vehicule::with(['entite_comptable', 'entite_physique',
        'demandeur', 'categorie', 'marque', 'tiers', 'detenteur',
         'chauffeur_atitre', 'contrat_assurance.compagnie_assurance', 'energie'])->orderBy('id', 'desc')->get();

         return response()->json($vehicules);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
       
        // return $this->model->create($request->only($this->model->getModel()->fillable));

         $vehicule = new Vehicule;
         $creation = $vehicule->create($request->only($vehicule->fillable));
  
         return response()->json(Vehicule::with(['entite_comptable', 'entite_physique',
         'demandeur', 'categorie', 'marque', 'tiers', 'detenteur',
          'chauffeur_atitre', 'contrat_assurance', 'energie'])->find($creation->id));

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\CoutConsomable  $coutConsomable
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return $this->model->show($id);

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\CoutConsomable  $coutConsomable
     * @return \Illuminate\Http\Response
     */
    public function edit(CoutConsomable $coutConsomable)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\CoutConsomable  $coutConsomable
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
          // update model and only pass in the fillable fields

       $this->model->update($request->only($this->model->getModel()->fillable), $id);

       return response()->json(Vehicule::with(['entite_comptable', 'entite_physique',
       'demandeur', 'categorie', 'marque', 'tiers', 'detenteur',
        'chauffeur_atitre', 'contrat_assurance', 'energie'])->find($id));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\CoutConsomable  $coutConsomable
     * @return \Illuminate\Http\Response
     */
    public function destroy( $id)
    {
        return $this->model->delete($id);

    }
}
