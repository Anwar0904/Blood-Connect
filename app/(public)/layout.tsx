// app/(public)/layout.tsx

import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";


export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen" suppressHydrationWarning>
      <Header />
      <main className="grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}



// import AuthProvider from "@/components/providers/SessionProvider"; // The one we built earlier

// import Header from "@/components/Layout/Header";

// import Footer from "@/components/Layout/Footer";

// import "./globals.css";


// export default function RootLayout({ children }: { children: React.ReactNode }) {

//   return (

//     <html lang="en">

//       <body>

//         {/* Everything inside AuthProvider can now use useSession() */}

//         <AuthProvider>

//           <Header />

//           <main>{children}</main>

//           <Footer />

//         </AuthProvider>

//       </body>

//     </html>

//   );

// }