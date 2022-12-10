import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { PlaceholderDirective } from "../shared/placeholder.directive";
import { MatTableModule } from "@angular/material/table";

import { LoadingSpinnerComponent } from "../shared/loading-spinner/loading-spinner.component";

import { CalendarComponent } from "./calendar/calendar.component";
import { MedRecordComponent } from "./med-record/med-record.component";
import { MedSheetComponent } from "./med-sheet/med-sheet.component";
import { ShowClientComponent } from "./show-client/show-client.component";
import { UserProfilComponent } from "./user-profil.component";
import { UserStartComponent } from "./user-start/user-start.component";
import { UserRoutingModule } from "./user-routing.module";


@NgModule({
    declarations: [
        UserProfilComponent,
        MedSheetComponent,
        MedRecordComponent,
        CalendarComponent,
        UserStartComponent,
        ShowClientComponent,
        PlaceholderDirective,
        LoadingSpinnerComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatTableModule,
        RouterModule,
        UserRoutingModule
    ],
    entryComponents: [
        ShowClientComponent
    ],
    exports: [
        UserProfilComponent,
        MedSheetComponent,
        MedRecordComponent,
        CalendarComponent,
        UserStartComponent,
        ShowClientComponent,
        PlaceholderDirective,
        LoadingSpinnerComponent
    ]
})
export class userModuel{}
