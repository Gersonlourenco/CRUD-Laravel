<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function showAllUsers()
    {
        return response()->json(User::all());
    }

    public function showOneUser($id)
    {
        return response()->json(User::find($id));
    }

    public function create(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'email' => 'required|email'//|unique:users'
        ]);

        $User = User::create($request->all());

        return response()->json($User, 201);
    }

    public function update($id, Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'email' => 'required|email'//|unique:users'
        ]);
        
        $User = User::findOrFail($id);
        $User->update($request->all());

        return response()->json($User, 200);
    }

    public function delete($id)
    {
        User::findOrFail($id)->delete();
        return response('', 200);//Deleted Successfully
    }
}