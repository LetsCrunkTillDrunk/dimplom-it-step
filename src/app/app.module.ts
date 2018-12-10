import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from "angularfire2/database";

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { routes } from './app.routes';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';
import { CategoryComponent } from './components/category/category.component';
import { TagComponent } from './components/tag/tag.component';
import { QuestionComponent } from './components/question/question.component';
import { AddQuestionComponent} from './components/add-question/add-question.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { QuestionsListComponent } from './components/questions-list/questions-list.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminQuestionsComponent } from './components/admin-questions/admin-questions.component';
import { ChatComponent } from './components/chat/chat.component';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';
import { UserService } from './services/user.service';
import { CategoryService } from './services/category.service';
import { TagService } from './services/tag.service';
import { QuestionService } from './services/question.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    CategoryComponent,
    TagComponent,
    QuestionComponent,
    AddQuestionComponent,
    DashboardComponent,
    QuestionsListComponent,
    AdminComponent,
    AdminQuestionsComponent,
    ChatComponent
  ],
  entryComponents: [
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    AngularFontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [AuthService, AuthGuard, UserService, CategoryService, TagService, QuestionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
