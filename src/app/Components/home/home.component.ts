import { Component, OnInit, inject } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CardComponent } from '../card/card.component';
import { UsersService } from '../../Services/users.service';

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

  fetchUsers() {
    this.userService.getAllUsers(1).subscribe((res) => console.log(res));
  }
}
