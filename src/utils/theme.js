import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "dark",

        primary: {
            main: "#3b82f6", // blue
            light: "#60a5fa",
            dark: "#2563eb",
            contrastText: "#ffffff",
        },

        secondary: {
            main: "#22d3ee", // cyan glow
        },

        background: {
            default: "#020617", // deep black-blue
            paper: "#0f172a",   // cards
        },

        text: {
            primary: "#e5e7eb",
            secondary: "#94a3b8",
        },

        divider: "rgba(148, 163, 184, 0.15)",
    },

    shape: {
        borderRadius: 12,
    },

    typography: {
        fontFamily: `"Inter", "Poppins", "Roboto", sans-serif`,
        h1: {
            fontWeight: 700,
            letterSpacing: "-0.02em",
        },
        h2: {
            fontWeight: 600,
        },
        button: {
            fontWeight: 600,
            textTransform: "none",
        },
    },

    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    background: `
            radial-gradient(circle at 20% 20%, rgba(59,130,246,0.15), transparent 40%),
            radial-gradient(circle at 90% 30%, rgba(34,211,238,0.12), transparent 40%),
            #020617
          `,
                },

                input: {
                    "&:-webkit-autofill": {
                        WebkitBoxShadow: "0 0 0 100px #0f172a inset !important",
                        WebkitTextFillColor: "#e5e7eb !important",
                    },
                },
            },
        },

        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                    padding: "10px 16px",
                    fontWeight: 600,
                },

                containedPrimary: {
                    background: "linear-gradient(135deg, #3b82f6, #22d3ee)",
                    boxShadow: "0 0 20px rgba(59,130,246,0.25)",
                },

                outlinedPrimary: {
                    borderColor: "#3b82f6",
                    color: "#3b82f6",
                    "&:hover": {
                        background: "rgba(59,130,246,0.08)",
                        borderColor: "#60a5fa",
                    },
                },
            },
        },

        MuiCard: {
            styleOverrides: {
                root: {
                    background: "rgba(15, 23, 42, 0.7)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(148,163,184,0.15)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                },
            },
        },

        MuiAppBar: {
            styleOverrides: {
                root: {
                    background: "rgba(15, 23, 42, 0.6)",
                    backdropFilter: "blur(10px)",
                    borderBottom: "1px solid rgba(148,163,184,0.1)",
                },
            },
        },

        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    background: "#020617",
                    borderRadius: 10,
                    "& fieldset": {
                        borderColor: "rgba(148,163,184,0.2)",
                    },
                    "&:hover fieldset": {
                        borderColor: "#3b82f6",
                    },
                    "&.Mui-focused fieldset": {
                        borderColor: "#22d3ee",
                    },
                },
                input: {
                    color: "#e5e7eb",
                },
            },
        },
    },
});

export default theme;