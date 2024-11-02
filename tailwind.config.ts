import { CSSProperties } from "react";
import plugin, { Config } from "tailwindcss";
import { CSSRuleObject, PluginAPI } from "tailwindcss/types/config";
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        "2xs": ".625rem",
        "3xs": ".5rem",
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        // template - change only the colors / recomplie to see changes
        input_border: "#b9b9b9",
        loading_icon: "#b9b9b9",
        button: "#0dbc73",
        header_modal: "#0dbc73",
        link: "#92b8ff",
        text: "#FFFFFF",

        // custom - from Figma
        bg: "#1f1f1f",
      },
    },
  },
  plugins: [
    function ({ addUtilities, matchUtilities, theme }: PluginAPI) {
      const newUtilities: Record<string, CSSProperties> = {};
      generateFlex(newUtilities)
      generateWidthHeight(newUtilities)
      generateText(newUtilities, theme, matchUtilities)
      generateExtras(newUtilities)

      addUtilities(newUtilities as CSSRuleObject);
    }
  ],
} satisfies Config;


function generateExtras(newUtilities: Record<string, CSSProperties>) {
  //! CURSOR POINTER
  newUtilities['.cp'] = {
    cursor: 'pointer',
    userSelect: 'none',
  };

  //! SELECT NONE
  newUtilities['.sn'] = {
    userSelect: 'none',
  };
}

//! TEXT
function generateText(
  newUtilities: Record<string, CSSProperties>,
  theme: PluginAPI["theme"], matchUtilities: PluginAPI["matchUtilities"]) {

  const textAligns: [string, CSSProperties["textAlign"]][] = [['', undefined], ['l', 'left'], ['c', 'center'], ['r', 'right'], ['j', 'justify']];

  function fontSizeCompute(i: number) {
    if (i === 7) return '1.5rem';
    if (i === 8) return '1.875rem';
    if (i === 9) return '2.25rem';
    return `${0.500 + i * (0.125)}rem`;
  }

  matchUtilities(
    {
      't': (value) => ({
        color: value,
      }),
    },
    { values: flattenColorPalette(theme('colors')), type: 'color' }
  );


  //? Text Align + Font Size + Font Weight
  for (let i = 1; i <= 9; i++) {
    for (let j = 1; j <= 9; j++) {
      for (const ta of textAligns) {
        newUtilities[`.t${i}${j}${ta[0]}`] = {
          fontSize: fontSizeCompute(i),
          fontWeight: `${j}00`,
          textAlign: ta[1],
        };
      }
    }
  }

  //? Text Align Only
  for (const ta of textAligns) {
    newUtilities[`.t${ta[0]}`] = {
      textAlign: ta[1],
    };
  }

  //? Text Size Only
  for (let i = 1; i <= 9; i++) {
    newUtilities[`.t${i}`] = {
      fontSize: fontSizeCompute(i),
    };
  }

  //? Font Weight Only
  for (let j = 1; j <= 9; j++) {
    newUtilities[`.tf${j}`] = {
      fontWeight: `${j}00`,
    };
  }


  // Object.entries(theme('textColor') || {}).forEach(([key, value]) => {
  //   newUtilities[`.t-${key}`] = Array.isArray(value) ? { color: value[0], ...value[1] } : { color: value };
  // });

  // Object.entries(theme('fontSize') || {}).forEach(([key, value]) => {
  //   newUtilities[`.t${key}`] = Array.isArray(value) ? { fontSize: value[0], ...value[1] } : { fontSize: value };
  // });

  // Object.entries(theme('textAlign') || {}).forEach(([key, value]) => {
  //   newUtilities[`.t-${key}`] = Array.isArray(value) ? { textAlign: value[0], ...value[1] } : { textAlign: value };
  // });
}

//! WIDTH / HEIGHT
function generateWidthHeight(newUtilities: Record<string, CSSProperties>) {
  newUtilities['.wf'] = {
    width: '100%',
  };

  newUtilities['.hf'] = {
    height: '100%',
  };

  newUtilities['.ws'] = {
    width: '100vw',
  };

  newUtilities['.hs'] = {
    height: '100vh',
  };

  newUtilities['.min-wf'] = {
    minWidth: '100%',
  };

  newUtilities['.min-hf'] = {
    minHeight: '100%',
  };

  newUtilities['.min-ws'] = {
    minWidth: '100vw',
  };

  newUtilities['.min-hs'] = {
    minHeight: '100vh',
  };


}


//! FLEX
function generateFlex(newUtilities: Record<string, CSSProperties>) {
  const flexDirections: [string, ('row' | 'column' | 'wrap')][] = [['r', 'row'], ['c', 'column'], ['w', 'wrap']]
  const alignItems = [['s', 'flex-start'], ['c', 'center'], ['e', 'flex-end']]
  const justifyContent = [['s', 'flex-start'], ['c', 'center'], ['e', 'flex-end'], ['b', 'space-between'], ['a', 'space-around']]

  for (const flexDirection of flexDirections) {
    for (const align of alignItems) {
      for (const justify of justifyContent) {
        const key_name = `.${flexDirection[0]}${justify[0]}${align[0]}`;
        newUtilities[key_name] = {
          display: 'flex',
          justifyContent: justify[1],
          alignItems: align[1],
        };

        if (flexDirection[1] === 'wrap') newUtilities[key_name]['flexWrap'] = 'wrap';
        else newUtilities[key_name]['flexDirection'] = flexDirection[1];

        const gaps = [
          ...Array.from({ length: 20 }, (_, i) => i + 1),
          ...Array.from({ length: Math.floor((96 - 20) / 4) + 1 }, (_, i) => 20 + i * 4)
        ];

        for (const i of gaps) {
          newUtilities[`${key_name}-${i}`] = {
            ...newUtilities[key_name],
            gap: `${i * 0.25}rem`,
          };

          newUtilities[`${key_name}-${i}`] = {
            ...newUtilities[key_name],
            gap: `${i * 0.25}rem`,
          };
        }
      }
    }
  }
  // newUtilities['.fc'] = {
  //   display: 'flex',
  //   flexDirection: 'column',
  // };

  // newUtilities['.fr'] = {
  //   display: 'flex',
  //   flexDirection: 'row',
  // };

  // newUtilities['.is'] = {
  //   alignSelf: 'flex-start',
  // };

  // newUtilities['.ic'] = {
  //   alignItems: 'center',
  // };

  // newUtilities['.ie'] = {
  //   alignItems: 'flex-end',
  // };

  // newUtilities['.js'] = {
  //   justifyContent: 'flex-start',
  // };

  // newUtilities['.jc'] = {
  //   justifyContent: 'center',
  // };

  // newUtilities['.je'] = {
  //   justifyContent: 'flex-end',
  // };

  // newUtilities['.jb'] = {
  //   justifyContent: 'space-between',
  // };

  // newUtilities['.ja'] = {
  //   justifyContent: 'space-around',
  // };



  // Dynamically generate classes .fc1, .fc2, ..., .fc96
  // for (let i = 1; i <= 96; i++) {
  //   newUtilities[`.fc${i}`] = {
  //     display: 'flex',
  //     flexDirection: 'column',
  //     gap: `${i * 0.25}rem`,
  //   };

  //   newUtilities[`.fr${i}`] = {
  //     display: 'flex',
  //     flexDirection: 'row',
  //     gap: `${i * 0.25}rem`,
  //   };
  // }
}