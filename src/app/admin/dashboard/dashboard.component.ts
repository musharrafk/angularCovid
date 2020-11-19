import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { AbsoluteSourceSpan } from '@angular/compiler';
declare var $: any;
declare var require: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  completed: any;
  pending: any;
  total: any;
  name: any;
  email: any;
  multipleBrandData: any;
  // brand: any;
  multiple = false;

  constructor(public ad: AdminService) { }

  ngOnInit() {

    const user = JSON.parse(localStorage.getItem('user'));

    const brand = user.brand;

    console.log(brand.split(',').length);
    if (brand.split(',').length <= 1) {
      console.log(brand);




      this.name = user.name;
      this.email = user.email;
      let completed = 'completed';
      let pending = 'pending';
      let total = 'total';
      const completedP = { 'startRow': 0, 'limit': 10, 'brand': brand, 'type': completed };

      // console.log('i am here');
      this.ad.getIndeed(completedP).subscribe((e: any) => {
        this.completed = e.count;
        $("#pie_chart_2").easyPieChart({
          barColor: "#2785bf",
          lineWidth: 5,
          animate: 3000,
          size: 100,
          lineCap: "square",
          scaleColor: false,
          onStep: function (from, to, percent) {
            $(this.el)
              .find(".percent")
              .text(Math.round(percent));
          }
        });
      });

      const pendingP = { 'startRow': 0, 'limit': 10, 'brand': brand, 'type': pending };

      this.ad.getIndeed(pendingP).subscribe((e: any) => {
        this.pending = e.count;

        $("#pie_chart_3").easyPieChart({
          barColor: "#2785bf",
          lineWidth: 5,
          animate: 3000,
          size: 100,
          lineCap: "square",
          scaleColor: false,
          onStep: function (from, to, percent) {
            $(this.el)
              .find(".percent")
              .text(Math.round(percent));
          }
        });
      });
      const totalP = { 'startRow': 0, 'limit': 10, 'brand': brand, 'type': total };

      this.ad.getIndeed(totalP).subscribe((e: any) => {
        this.total = e.count;
        $("#pie_chart_1").easyPieChart({
          barColor: "#2785bf",
          lineWidth: 5,
          animate: 3000,
          size: 100,
          lineCap: "square",
          scaleColor: false,
          onStep: function (from, to, percent) {
            $(this.el)
              .find(".percent")
              .text(Math.round(percent));
          }
        });
      });


    } else {
      this.multiple = true;
      const data = "";
      this.name = user.name;
      this.email = user.email;
      let completed = 'completed';
      let pending = 'pending';
      let total = 'total';

      this.ad.getDataByBrand(data).subscribe((e: any) => {
        console.log(e);
        let arr = [];
        e.forEach((t, index) => {
          t.data = Object.keys(t.data).map(key => ({ type: key, value: t.data[key] }));


        });

        this.multipleBrandData = e;

        // this.multipleBrandData.forEach((d, index) => {
        //   d.data.forEach((eg, jj) => {
        //     const idd = JSON.stringify(index) + JSON.stringify(jj);
        //     // console.log("#pie_chart_" + idd)
        //     $("#pie_chart_1").easyPieChart({
        //       barColor: "#2785bf",
        //       lineWidth: 5,
        //       animate: 3000,
        //       size: 100,
        //       lineCap: "square",
        //       scaleColor: false,
        //       onStep: function (from, to, percent) {
        //         $(this.el)
        //           .find(".percent")
        //           .text(Math.round(percent));
        //       }
        //     });
        //   })
        // })
      });


    }








  }

  renderPieChart(main, index) {
    console.log(main, index)
    $("#pie_chart_" + main + index).easyPieChart({
      barColor: "#2785bf",
      lineWidth: 5,
      animate: 3000,
      size: 100,
      lineCap: "square",
      scaleColor: false,
      onStep: function (from, to, percent) {
        $(this.el)
          .find(".percent")
          .text(Math.round(percent));
      }
    });
  }

}
