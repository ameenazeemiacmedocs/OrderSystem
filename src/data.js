export const foodMenus = [
  {
    id: "GUID-108",
    name: "Appetizers",
    diplayOrder: 1,
    menuItems: [
      {
        id: "GUID-118",
        menuAreaId: "GUID-108",
        fullName: "Fried Calamari",
        shortName: "Calamari",
        description: "Delicious Fried Calamari",
        basePrice: 6.45,
        smallImageUrl: "",
        largeImageUrl: "",
        displayOrder: 1,
        menuItemsChoices: []
      },
      {
        id: "GUID-119",
        menuAreaId: "GUID-108",
        fullName: "Tuna Sashimi",
        shortName: "Tuna",
        description: "Tuna & Sashimi",
        basePrice: 12.5,
        smallImageUrl: "",
        largeImageUrl: "",
        displayOrder: 2,
        menuItemsChoices: []
      },
      {
        id: "GUID-120",
        menuAreaId: "GUID-108",
        fullName: "Guacamole & Chips",
        shortName: "Chips",
        description: "Guacamole sauce with chips",
        basePrice: 7.0,
        smallImageUrl: "",
        largeImageUrl: "",
        displayOrder: 3,
        menuItemsChoices: []
      }
    ]
  },
  {
    id: "GUID-109",
    name: "Soups & Salads",
    diplayOrder: 2,
    menuItems: [
      {
        id: "GUID-121",
        menuAreaId: "GUID-109",
        fullName: "Chicken Corn Soup",
        shortName: "Corn Soup",
        description: "Hot Chicken and corn soup",
        basePrice: 10.45,
        smallImageUrl: "",
        largeImageUrl: "",
        displayOrder: 1,
        menuItemsChoices: []
      },
      {
        id: "GUID-122",
        menuAreaId: "GUID-109",
        fullName: "Fruits Salad",
        shortName: "Salad",
        description: "Mixed Fruits Salad",
        basePrice: 8.25,
        smallImageUrl: "",
        largeImageUrl: "",
        displayOrder: 2,
        menuItemsChoices: []
      }
    ]
  },
  {
    id: "GUID-110",
    name: "Main Course",
    diplayOrder: 3,
    menuItems: [
      {
        id: "GUID-123",
        menuAreaId: "GUID-110",
        fullName: "Bacon Cheeseburger",
        shortName: "Burger",
        description: "Delicious Bacon Cheeseburger",
        basePrice: 5.45,
        smallImageUrl: "",
        largeImageUrl: "",
        displayOrder: 3,
        menuItemsChoices: [
          {
            id: "GUID-135",
            menuItemId: "GUID-123",
            fullName: "Side Dish",
            isRadioChoice: true,
            displayOrder: 1,
            menuItemDetails: [
              {
                id: "GUID-155",
                menuChoiceItemId: "GUID-135",
                fullName: "Fries",
                extraCharge: 0.0,
                displayOrder: 1
              },
              {
                id: "GUID-156",
                menuChoiceItemId: "GUID-135",
                fullName: "Salad",
                extraCharge: 0.0,
                displayOrder: 2
              },
              {
                id: "GUID-157",
                menuChoiceItemId: "GUID-135",
                fullName: "Vegetables",
                extraCharge: 1.0,
                displayOrder: 3
              }
            ]
          },
          {
            id: "GUID-136",
            menuItemId: "GUID-123",
            fullName: "Extras",
            isRadioChoice: false,
            displayOrder: 2,
            menuItemDetails: [
              {
                id: "GUID-158",
                menuChoiceItemId: "GUID-136",
                fullName: "Ketchup",
                extraCharge: 0.0,
                displayOrder: 1
              },
              {
                id: "GUID-159",
                menuChoiceItemId: "GUID-136",
                fullName: "Hotsauce",
                extraCharge: 0.5,
                displayOrder: 2
              }
            ]
          }
        ]
      },
      {
        id: "GUID-124",
        menuAreaId: "GUID-110",
        fullName: "Plank Salmon",
        shortName: "Salmon",
        description: "Tasty Salmon cooked on a cedar plank",
        basePrice: 15.25,
        smallImageUrl: "",
        largeImageUrl: "",
        displayOrder: 1,
        menuItemsChoices: []
      }
    ]
  },
  {
    id: "GUID-111",
    name: "Desserts",
    diplayOrder: 4,
    menuItems: [
      {
        id: "GUID-125",
        menuAreaId: "GUID-111",
        fullName: "Vanilla Ice Cream",
        shortName: "Ice Cream",
        description: "Delicious vanilla flavoured ice cream",
        basePrice: 3.45,
        smallImageUrl: "",
        largeImageUrl: "",
        displayOrder: 1,
        menuItemsChoices: []
      },
      {
        id: "GUID-126",
        menuAreaId: "GUID-111",
        fullName: "Strawberry Cup Cakes",
        shortName: "Cup Cakes",
        description: "Cup Cakes with strawberry falvour",
        basePrice: 2.15,
        smallImageUrl: "",
        largeImageUrl: "",
        displayOrder: 2,
        menuItemsChoices: []
      }
    ]
  }
];
