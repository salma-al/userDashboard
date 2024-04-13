import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UsersService } from '../../Services/users.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  searchTerm!: number;
  searchResults: any[] = [];

  constructor(private router: Router, private userService: UsersService) {}

  performSearch() {
    if (this.searchTerm) {
      this.userService.GetUserByID(this.searchTerm).subscribe({
        next: (res: any) => {
          this.searchResults = res.data;
          this.router.navigate(['/'], {
            queryParams: { search: this.searchTerm },
          });
        },
        error: (err) => {
          console.log(err);
          this.searchResults = [];
          this.router.navigate(['/'], { queryParams: { search: null } });
        },
      });
    } else {
      this.searchResults = [];
      this.router.navigate(['/'], { queryParams: { search: null } });
    }
  }
}
