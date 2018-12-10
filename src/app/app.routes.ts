import { Routes } from "@angular/router";

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from "./components/register/register.component";
import { UserComponent } from "./components/user/user.component";
import { CategoryComponent } from './components/category/category.component';
import { AdminComponent } from './components/admin/admin.component';
import { TagComponent } from './components/tag/tag.component';
import { QuestionComponent } from './components/question/question.component';
import { AddQuestionComponent } from './components/add-question/add-question.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminQuestionsComponent } from './components/admin-questions/admin-questions.component';
import { QuestionsListComponent } from './components/questions-list/questions-list.component';
import { ChatComponent } from './components/chat/chat.component';

import { AuthGuard } from './services/auth.guard';

export const routes:Routes = [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'categories', component: CategoryComponent},
    {path: 'questions', component: QuestionsListComponent, canActivate:[AuthGuard]},
    {path: 'questions/add', component: AddQuestionComponent},
    {path: 'tags', component: TagComponent},
    {path: 'user', component: UserComponent},
    {path: 'chat', component: ChatComponent},
    {path: 'admin', component: AdminComponent, children: [
        {
          path: '',
          pathMatch: 'full',
          component: DashboardComponent
        },
        {
          path: 'categories',
          component: CategoryComponent
        },
        {
          path: 'tags',
          component: TagComponent
        },
        {
          path: 'questions',
          component: AdminQuestionsComponent
        }
  
      ]}
];