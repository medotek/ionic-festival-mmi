import { Injectable } from "@angular/core";

@Injectable()
export class Menu
{
    title = "CRUD"
    subtitle = "Créer, modifier, supprimer et consulter"
    pages = [
    {
        title: "Oeuvre",
        url: "/admin/oeuvre",
    }
    ];
}