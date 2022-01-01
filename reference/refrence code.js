app.get("/todos", async (req, res) => {
  try {
  } catch (err) {
    console.log(err.message);
  }
});

/*
TOWING VAN
{
  "van_name":"Piaggio APE",
  "driver_name": "Vikrant Parab",
  "van_number": "MH05DA2313"
}

CUSTOMER
{
  "first_name":"Vikrant",
  "last_name": "Parab",
  "phone": "9819349383",
  "email":"vkrant@gmail.com",
  "address_line1":"Tisgaon",
  "address_line2":"Kalyan",
  "city": "Thane",
  "state": "Maharashtra",
  "zip_code": "421306"
}

STORE
{
  "store_name":"MH-47",
  "phone": "9819349383",
  "email":"MH47@gmail.com",
  "address_line1":"Tisgaon",
  "address_line2":"Kalyan",
  "city": "Thane",
  "state": "Maharashtra",
  "zip_code": "421306"
}

GARAGE
{
  "garage_name":"MH-47",
  "phone": "9819349383",
  "email":"MH47@gmail.com",
  "address_line1":"Tisgaon",
  "address_line2":"Kalyan",
  "city": "Thane",
  "state": "Maharashtra",
  "zip_code": "421306"
}

Dashboard: {
  owner : {
    name:"",
    title:"",
    thumbnail_url: ""
  },
  customers: [
    {
      name: "",
      emailId: "",
      thumbnailUrl: ""
    }
  ],
  recentActivities: [
    {
      customer_name: "",
      thumbnail_url: "",
      desription: "",
      activityDate: ""
    }
  ],
  monthlySales: {
    labels: ["January", "Feb..."....],
    datasets:[
      {
        label: "Monthly Sales",
        data: [65, 59, 80, 81, 56, 55, 40],
      }
    ]
  },
  visitors: {
    labels: ["With Gear", "Without Gear", "E-Bikes"],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726"],
        hoverBackgroundColor: ["#64B5F6", "#81C784", "#FFB74D"],
      },
    ],
  },
  employeeReport: {
    carsSold: {
      labels: ["With Gear", "Without Gear", "E-Bikes"],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726"],
          hoverBackgroundColor: ["#64B5F6", "#81C784", "#FFB74D"],
        },
      ],
    },
    revenueGenerated: {
      labels: ["With Gear", "Without Gear", "E-Bikes"],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726"],
          hoverBackgroundColor: ["#64B5F6", "#81C784", "#FFB74D"],
        },
      ],
    }
  },
  expenditure: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
          label: 'Expenses',
          backgroundColor: '#42A5F5',
          data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
  },
  income: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
          label: 'Credits',
          backgroundColor: '#42A5F5',
          data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
  }
}
*/
