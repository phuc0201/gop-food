
export const Restaurants = [
  {
    id: "6619f8d0637116c6a679f4aa",
    status: 'CLOSED',
    restaurant_name: 'UTE88',
    address: '',
    location: {
      type: 'Point',
      coordinates: [1, 1]
    },
    bio: '',
    review: '',
    avatar: '',
    cover_image: 'assets/img/foods/food-default.webp',
    restaurant_profile: '',
    cuisine_categories: [
      'MILK_TEA',
      'DRINKS',
      'BANH_MI'
    ],
    distance: 0,
    restaurant_categories: [
      {
        id: '1',
        name: "Hỗn tạp",
        bio: "say oh yeahhhhhh!!!",
        food_items: [
          {
            id: '1',
            name: "Bún đậu mắm tôm",
            bio: "Bún đậu mắm tôm siu to khổng lồ",
            price: 30000,
            image: 'assets/img/foods/food-default.webp',
            modifier_groups: [
              {
                id: '1',
                min: 0,
                max: 3,
                name: "Chọn thêm",
                modifier: [
                  {
                    id: '1',
                    name: "Đậu hủ",
                    price: 5000
                  },
                  {
                    id: '2',
                    name: "Nem chua",
                    price: 5000
                  },
                  {
                    id: '3',
                    name: "Chả cá",
                    price: 5000
                  }
                ]
              },
              {
                id: '2',
                min: 1,
                max: 1,
                name: "Chọn nước mắm",
                modifier: [
                  {
                    id: '4',
                    name: "Nước mắm",
                    price: 5000
                  },
                  {
                    id: '5',
                    name: "Nước mắm chua ngọt",
                    price: 5000
                  },
                  {
                    id: '6',
                    name: "Nước mắm pha",
                    price: 5000
                  }
                ]
              }
            ]
          },
          {
            id: '2',
            name: "Bún bò Huế",
            bio: "Bún bò Huế siu to khổng lồ",
            image: 'assets/img/foods/food-default.webp',
            price: 30000,
            modifier_groups: [
              {
                id: '3',
                name: "Chọn thêm",
                min: 0,
                max: 3,
                modifier: [
                  {
                    id: '7',
                    name: "Bún",
                    price: 5000
                  },
                  {
                    id: '8',
                    name: "Thịt",
                    price: 5000
                  },
                  {
                    id: '9',
                    name: "Bò viên",
                    price: 5000
                  }
                ]
              },
              {
                id: '4',
                name: "Chọn size",
                min: 1,
                max: 1,
                modifier: [
                  {
                    id: '10',
                    name: "Nhỏ",
                    price: 0
                  },
                  {
                    id: '11',
                    name: "To",
                    price: 5000
                  }
                ]
              }
            ]
          },
        ]
      }
    ],
  }
];

