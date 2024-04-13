import { Component, OnInit, inject } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CardComponent } from '../card/card.component';
import { UsersService } from '../../Services/users.service';
import { ActivatedRoute } from '@angular/router';

interface Support {
  text: string;
  url: string;
}
interface Response {
  data: User[];
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
  last_name: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatPaginatorModule, CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  private userService = inject(UsersService);

  users: User[] = [];

  pageSize!: number;
  length!: number;
  currentPage = 1;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const searchTerm = params['search'];
      if (searchTerm) {
        this.userService.GetUserByID(searchTerm).subscribe({
          next: (res: any) => {
            console.log(res);
            this.users = [res.data];
          },
          error: (err) => {
            console.log(err);
          },
        });
      } else {
        this.fetchUsers(this.currentPage);
      }
    });
  }

  fetchUsers(page: number) {
    this.userService.getAllUsers(page).subscribe({
      next: (res: any) => {
        // console.log(res);
        this.users = res.data;
        this.length = res.total;
        this.pageSize = res.per_page;
        this.currentPage = page;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  
  pageHandler(event: any) {
    // console.log(event);
    const pageIndex = event.pageIndex; 
    const nextPage = pageIndex + 1;
    this.fetchUsers(nextPage);
  }
}
