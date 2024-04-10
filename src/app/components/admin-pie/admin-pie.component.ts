import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-admin-pie',
  templateUrl: './admin-pie.component.html',
  styleUrls: ['./admin-pie.component.scss']
})
export class AdminPieComponent implements OnInit {
  Chart!: any;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getCommandes().subscribe((data: any[]) => {

      // Filtrer les commandes ayant le statut "valide"
      const commandesValides = data.filter(commande => commande.statut === 'valide');

      // Agréger le nombre de commandes par client
      const aggregatedData = this.aggregateDataByClient(commandesValides);

      // Trier les clients par le nombre de commandes (du plus grand au plus petit)
      const sortedClients = Object.keys(aggregatedData).sort((a, b) => aggregatedData[b] - aggregatedData[a]);

      // Créer le graphique en forme de camembert (pie chart)
      this.createPieChart(sortedClients.map(client => aggregatedData[client]), sortedClients);
    });
  }

  aggregateDataByClient(data: any[]) {
    const aggregatedData: { [key: string]: number } = {};

    data.forEach(commande => {
      const senderEmail = commande.senderEmail;
      aggregatedData[senderEmail] = (aggregatedData[senderEmail] || 0) + 1;
    });

    return aggregatedData;
  }

  createPieChart(data: number[], labels: string[]) {
    const ctx = document.getElementById('clientChart') as HTMLCanvasElement;
    const myChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.7)',
              'rgba(54, 162, 235, 0.7)',
              'rgba(255, 206, 86, 0.7)',
              'rgba(75, 192, 192, 0.7)',
              // Ajoutez davantage de couleurs si nécessaire
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              // Ajoutez davantage de couleurs si nécessaire
            ],
            borderWidth: 1,
          },
        ],
      },
    });
  }
}
