import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UsersService } from '../../Services/users.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

interface User {
  avatar: string;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
}

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [HttpClientModule, MatProgressSpinnerModule, RouterModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css',
})
export class UserDetailsComponent implements OnInit {
  id = 1;

  user: User | null = null;

  constructor(myActivated: ActivatedRoute, private userService: UsersService) {
    this.id = myActivated.snapshot.params['id'];
  }

  ngOnInit(): void {
    // console.log(this.id);
    this.userService.GetUserByID(this.id).subscribe({
      next: (res: any) => {
        this.user = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
