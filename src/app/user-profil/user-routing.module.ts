import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { CalendarComponent } from "./calendar/calendar.component";
import { MedRecordComponent } from "./med-record/med-record.component";
import { MedSheetComponent } from "./med-sheet/med-sheet.component";
import { UserProfilComponent } from "./user-profil.component";
import { UserStartComponent } from "./user-start/user-start.component";

const userRoutes: Routes = [
    { path: 'profil', component: UserProfilComponent,
          canActivate: [ AuthGuard ],
          children: [
            { path: '', component: UserStartComponent},
            { path: 'calendar', component:  CalendarComponent},
            { path: 'medsheet', component: MedSheetComponent},
            { path: 'medrecord', component: MedRecordComponent}
          ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(userRoutes) ],
    exports: [ RouterModule ]
})
export class UserRoutingModule{}