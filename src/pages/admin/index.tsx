import useSWR from "swr"
import { AccessTimeRounded, AttachMoneyRounded, CancelPresentationRounded, CategoryRounded, CreditCardOffRounded, CreditCardRounded, DashboardRounded, GroupRounded, ProductionQuantityLimitsRounded } from "@mui/icons-material"
import { Grid, Typography } from "@mui/material"
import { AdminLayout, SummaryTile } from "@/components"
import { DashboardSummaryRes } from "@/interfaces"
import { useEffect, useState } from "react"


const DashboardPage = () => {

  const { data, error } = useSWR<DashboardSummaryRes>('/api/admin/dashboard', {
    refreshInterval: 30 * 1000
  })

  const [refreshIn, setRefreshIn] = useState(30)

  useEffect(() => {
    const interval = setInterval(() => {
        setRefreshIn( refreshIn => refreshIn > 0 ? refreshIn - 1 : 30)
    }, 1000)
  
    return () => clearInterval(interval)
  }, [])
  

  if( !error && !data ){
    return <></>
  }

  if( error ){
    console.log(error)
    return <Typography>Error loading information </Typography>
  }

  const { lowInventory, notPaidOrders, numberOfClients, numberOfOrders, numberOfProducts, outOfStock, paidOrders } = data!

  return (
    <AdminLayout title='Dashboard' subtitle='General statistics' icon={ <DashboardRounded sx={{ mr: 1 }} /> } >
      
      <Grid container spacing={ 2 }>

        <SummaryTile title={numberOfOrders} subtitle='Total orders' icon={ <CreditCardRounded color="secondary" sx={{ fontSize: 40 }} /> } />

        <SummaryTile title={paidOrders} subtitle='Paid orders' icon={ <AttachMoneyRounded color="success" sx={{ fontSize: 40 }} /> } />

        <SummaryTile title={notPaidOrders} subtitle='Pending orders' icon={ <CreditCardOffRounded color="error" sx={{ fontSize: 40 }} /> } />

        <SummaryTile title={numberOfClients} subtitle='Clients' icon={ <GroupRounded color="primary" sx={{ fontSize: 40 }} /> } />

        <SummaryTile title={numberOfProducts} subtitle='Products' icon={ <CategoryRounded color="warning" sx={{ fontSize: 40 }} /> } />

        <SummaryTile title={outOfStock} subtitle='Out of stock products' icon={ <CancelPresentationRounded color="error" sx={{ fontSize: 40 }} /> } />

        <SummaryTile title={lowInventory} subtitle='Low stock' icon={ <ProductionQuantityLimitsRounded color="warning" sx={{ fontSize: 40 }} /> } />

        <SummaryTile title={refreshIn} subtitle='Update in:' icon={ <AccessTimeRounded color="secondary" sx={{ fontSize: 40 }} /> } />

      </Grid>

    </AdminLayout>
  )
}

export default DashboardPage