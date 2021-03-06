<?php

namespace App\Imports;

use App\Personnel;
use Maatwebsite\Excel\Concerns\ToModel;

class PersonnelsImport implements ToModel
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new Personnel([
            'nom'     => $row[0],
            'prenom'    => $row[1],
            'fonction' => $row[2],
            'matricule' => $row[3],
           // 'password' => \Hash::make('123456'),

        ]);
    }
}
