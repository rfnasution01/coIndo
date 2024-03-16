import { createBrowserRouter } from 'react-router-dom'

import RootLayout from '@/App'
import { NotFound } from './loadables'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    // children: [
    //   {
    //     path: 'admisi',
    //     element: <Admin />,
    //     children: [
    //       {
    //         path: '',
    //         element: <AdmisiUser />,
    //       },
    //       {
    //         path: 'umum',
    //         element: (
    //           <TabDataProvider>
    //             <TabData />
    //           </TabDataProvider>
    //         ),
    //         id: 'antrian',

    //         children: [
    //           {
    //             path: '',
    //             element: <Subtab />,
    //             children: [
    //               {
    //                 path: 'antrean-aktif',
    //                 element: <SubtabData />,
    //               },
    //               {
    //                 path: 'transfer-pasien',
    //                 element: <SubtabData />,
    //               },
    //               {
    //                 path: 'antrean-terbatalkan',
    //                 element: <SubtabData />,
    //               },
    //             ],
    //           },
    //         ],
    //       },
    //     ],
    //   },
    //   {
    //     path: 'poli',
    //     element: <Admin />,
    //     children: [
    //       {
    //         path: '',
    //         element: <PoliUser />,
    //       },
    //       {
    //         path: ':unitPelayanan',
    //         element: (
    //           <TabDataProvider>
    //             <TabData />
    //           </TabDataProvider>
    //         ),
    //         children: [
    //           {
    //             path: '',
    //             element: <Subtab />,
    //             children: [
    //               {
    //                 path: 'antrean-aktif',
    //                 element: <SubtabData />,
    //               },
    //               {
    //                 path: 'transfer-pasien',
    //                 element: <SubtabData />,
    //               },
    //               {
    //                 path: 'antrean-terbatalkan',
    //                 element: <SubtabData />,
    //               },
    //             ],
    //           },
    //         ],
    //       },
    //     ],
    //   },
    //   {
    //     path: 'farmasi',
    //     element: <Admin />,
    //     children: [
    //       {
    //         path: '',
    //         element: <FarmasiUser />,
    //       },
    //       {
    //         path: 'antrean-aktif',
    //         element: (
    //           <TabDataProvider>
    //             <TabData>
    //               <Subtab>
    //                 <SubtabData />
    //               </Subtab>
    //             </TabData>
    //           </TabDataProvider>
    //         ),
    //       },
    //       {
    //         path: 'antrean-pending',
    //         element: (
    //           <TabDataProvider>
    //             <TabData>
    //               <Subtab>
    //                 <SubtabData />
    //               </Subtab>
    //             </TabData>
    //           </TabDataProvider>
    //         ),
    //       },
    //       {
    //         path: 'kasir',
    //         element: (
    //           <TabDataProvider>
    //             <TabData>
    //               <Subtab>
    //                 <SubtabData />
    //               </Subtab>
    //             </TabData>
    //           </TabDataProvider>
    //         ),
    //       },
    //     ],
    //   },
    //   {
    //     path: 'kasir',
    //     element: <Admin />,
    //     children: [
    //       {
    //         path: '',
    //         element: <KasirUser />,
    //       },
    //       {
    //         path: 'antrean-aktif',
    //         element: (
    //           <TabDataProvider>
    //             <TabData>
    //               <Subtab>
    //                 <SubtabData />
    //               </Subtab>
    //             </TabData>
    //           </TabDataProvider>
    //         ),
    //       },
    //     ],
    //   },
    //   {
    //     path: 'ketersediaan-kamar',
    //     element: <Admin />,
    //     children: [
    //       {
    //         path: '',
    //         element: <KetersediaanKamarUser />,
    //       },
    //     ],
    //   },
    // ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
