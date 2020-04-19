const initialState = [
  {
    neo_reference_id: "2453563",
    name: "453563 (2010 BB)",
    nasa_jpl_url: "http://ssd.jpl.nasa.gov/sbdb.cgi?sstr=2453563",
    absolute_magnitude_h: 20.2,
    estimated_diameter: {
      kilometers: {
        estimated_diameter_min: 0.2424124811,
        estimated_diameter_max: 0.5420507863
      },
      meters: {
        estimated_diameter_min: 242.4124811008,
        estimated_diameter_max: 542.0507863358
      },
      miles: {
        estimated_diameter_min: 0.1506280858,
        estimated_diameter_max: 0.3368146392
      },
      feet: {
        estimated_diameter_min: 795.3165644948,
        estimated_diameter_max: 1778.3819018419
      }
    },
    is_potentially_hazardous_asteroid: true,
    close_approach_data: [
      {
        close_approach_date: "1990-01-01",
        epoch_date_close_approach: 631180800000,
        relative_velocity: {
          kilometers_per_second: "7.6133530974",
          kilometers_per_hour: "27408.071150614",
          miles_per_hour: "17030.3095435579"
        },
        miss_distance: {
          astronomical: "0.0314256579",
          lunar: "12.2245807648",
          kilometers: "4701211.5",
          miles: "2921197.5"
        },
        orbiting_body: "Earth"
      }
    ]
  },
  {
    neo_reference_id: "3250293",
    name: "(2004 QA22)",
    nasa_jpl_url: "https://github.com/Bsadoway/AstrRisk",
    absolute_magnitude_h: 27.9,
    estimated_diameter: {
      kilometers: {
        estimated_diameter_min: 0.0069912523,
        estimated_diameter_max: 0.0156329154
      },
      meters: {
        estimated_diameter_min: 6.9912523225,
        estimated_diameter_max: 15.6329154409
      },
      miles: {
        estimated_diameter_min: 0.0043441614,
        estimated_diameter_max: 0.0097138403
      },
      feet: {
        estimated_diameter_min: 22.9371802696,
        estimated_diameter_max: 51.289094295
      }
    },
    is_potentially_hazardous_asteroid: false,
    close_approach_data: [
      {
        close_approach_date: "1990-01-01",
        epoch_date_close_approach: 631180800000,
        relative_velocity: {
          kilometers_per_second: "3.890698494",
          kilometers_per_hour: "14006.5145782913",
          miles_per_hour: "8703.1034611611"
        },
        miss_distance: {
          astronomical: "0.0128986523",
          lunar: "5.0175757408",
          kilometers: "1929610.875",
          miles: "1199004.625"
        },
        orbiting_body: "Earth"
      }
    ]
  },
  {
    neo_reference_id: "3395309",
    name: "(2007 VL243)",
    nasa_jpl_url: "http://ssd.jpl.nasa.gov/sbdb.cgi?sstr=3395309",
    absolute_magnitude_h: 17.8,
    estimated_diameter: {
      kilometers: {
        estimated_diameter_min: 0.7320739893,
        estimated_diameter_max: 1.6369672047
      },
      meters: {
        estimated_diameter_min: 732.0739893473,
        estimated_diameter_max: 1636.96720474
      },
      miles: {
        estimated_diameter_min: 0.4548895468,
        estimated_diameter_max: 1.017163949
      },
      feet: {
        estimated_diameter_min: 2401.8176272101,
        estimated_diameter_max: 5370.6274839991
      }
    },
    is_potentially_hazardous_asteroid: false,
    close_approach_data: [
      {
        close_approach_date: "1990-01-01",
        epoch_date_close_approach: 631180800000,
        relative_velocity: {
          kilometers_per_second: "32.1393463326",
          kilometers_per_hour: "115701.6467972167",
          miles_per_hour: "71892.5038113039"
        },
        miss_distance: {
          astronomical: "0.4037110917",
          lunar: "157.0436096191",
          kilometers: "60394320",
          miles: "37527288"
        },
        orbiting_body: "Earth"
      }
    ]
  }
];

export const fireBallDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADFIREBALLDATA":
      return action.payload;
    default:
      return state;
  }
};

export const neoDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADNEODATA":
      return action.payload;
    default:
      return state;
  }
};

// Reducer for neo pop up info
export const singleNeoDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOWNEOPOPUP":
      return action.payload;
    default:
      return state;
  }
};

export const toggleNeoPopUpReducer = (state = false, action) => {
  switch (action.type) {
    case "CLOSEPOPUP":
      return false;
    case "SHOWNEOPOPUP":
      return true;
    default:
      return state;
  }
};
export const toggleHeatMapReducer = (state = false, action) => {
  switch (action.type) {
    case "CLOSEPOPUP":
      return false;
    case "SHOWHEATMAP":
      return true;
    default:
      return state;
  }
};

export const togglePopUpReducer = (state = false, action) => {
  switch (action.type) {
    case "SHOWNEOPOPUP":
      return true;
    case "SHOWHEATMAP":
      return true;
    case "SHOWPOPUP":
      return true;
    case "CLOSEPOPUP":
      return false;
    default:
      return state;
  }
};

export const annualDataReducer = (state = [], action) => {
  switch (action.type) {
    case "LOADANNUALDATA":
      return action.payload;
    default:
      return state;
  }
};

export const dateReducer = (
  state = new Date().toISOString().split("T")[0],
  action
) => {
  switch (action.type) {
    case "GETDATE":
      return action.payload;
    default:
      return state;
  }
};

export const getSliderReducer = (state = 40, action) => {
  switch (action.type) {
    case "SLIDERCHANGE":
      return action.payload;
    default:
      return state;
  }
};

export const toggleFireballReducer = (state = false, action) => {
  switch (action.type) {
    case "OFFFIREBALL":
      return false;
    case "TOGGLEFIREBALL":
      const bool = !state;
      return bool;
    default:
      return state;
  }
};

export const toggleDangerBarReducer = (state = false, action) => {
  switch (action.type) {
    case "TOGGLEDANGERBAR":
      const bool = state;
      return !bool;
    default:
      return false;
  }
};
