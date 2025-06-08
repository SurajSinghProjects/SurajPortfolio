import CustomThemeProvider from "@/components/theme-provider/ThemeProvider";
import store from "@/store/store";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
  return (
    <>
      <main>
        <Provider store={store}>
          <CustomThemeProvider>
            <Component {...pageProps} />
          </CustomThemeProvider>
        </Provider>
      </main>
    </>
  );
}
