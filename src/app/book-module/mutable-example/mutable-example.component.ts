import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mutable-example',
  templateUrl: './mutable-example.component.html',
  styleUrls: ['./mutable-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MutableExampleComponent implements OnInit {

  @Input() directMutableData;

  constructor() { }

  ngOnInit() {
  }

}
