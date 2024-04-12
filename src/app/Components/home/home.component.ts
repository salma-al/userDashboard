import { Component, OnInit, inject } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CardComponent } from '../card/card.component';
import { UsersService } from '../../Services/users.service';

interface Support {
  text: string;
  url: string;
}
interface Response {
  data: any[];
  page: number;
  per_page: number;
  support: Support;
  total: number;
  total_pages: number;
}

interface User {
  avatar: string;
  email: string;
  first_name: string;
  id: number;
  last_name: string
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatPaginatorModule, CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  length = 12;
  pageSize = 6;

  private userService = inject(UsersService);

  ngOnInit(): void {
    this.fetchUsers();
  }

  users: User[] = [];

  fetchUsers() {
    this.userService.getAllUsers(1).subscribe({
      next: (res: any) => {
        this.users = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
