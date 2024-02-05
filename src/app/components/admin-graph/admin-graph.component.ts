import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-admin-graph',
  templateUrl: './admin-graph.component.html',
  styleUrls: ['./admin-graph.component.scss'],
})
export class AdminGraphComponent implements OnInit {
  Chart!: any;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getCommandes().subscribe((data: any[]) => {
      // Agréger les montants par date
      const aggregatedData = this.aggregateDataByDate(data);

      // Trier les dates de la plus ancienne à la plus récente
      const sortedDates = Object.keys(aggregatedData).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

      // Trier les montants en fonction des dates triées
      const sortedMontants = sortedDates.map(date => aggregatedData[date]);

      // Créer le graphique à bandes rectangulaires (bar chart)
      this.createBarChart(sortedDates, sortedMontants);
    });
  }

  aggregateDataByDate(data: any[]) {
    const aggregatedData: { [key: string]: number } = {};

    data.forEach(commande => {
      const dateExpedition = commande.dateExpedition.split('T')[0];
      aggregatedData[dateExpedition] = (aggregatedData[dateExpedition] || 0) + parseFloat(commande.prix);
    });

    return aggregatedData;
  }

  createBarChart(labels: any[], montants: any[]) {
    const ctx = document.getElementById('commandeChart') as HTMLCanvasElement;
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Montant total des ventes par jour',
            data: montants,
            backgroundColor: 'rgba(75, 192, 192, 0.7)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          // @ts-ignore
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}