import { createSlice } from "@reduxjs/toolkit";

const invoicesSlice = createSlice({
  name: "invoices",
  initialState: [],
  reducers: {
    addInvoice: (state, action) => {
      state.push(action.payload);
    },
    deleteInvoice: (state, action) => {
      return state.filter((invoice) => invoice.id !== action.payload);
    },
    updateInvoice: (state, action) => {
      const index = state.findIndex(
        (invoice) => invoice.id === action.payload.id
      );
      if (index !== -1) {
        state[index] = action.payload.updatedInvoice;
      }
    },
    bulkEditInvoice: (state, action) => {
      // const invoicesList = state.map(item=>{
      //   const index = item.findIndex(
      //     (invoice)=> invoice.id === action.payload.id
      //   );
      //   if( index !== -1) {
      //     item[index] = action.payload.invoice
      //   }

      // })
      const updatedInvoices = action.payload.updatedInvoices; // input is Array of updated invoices

      updatedInvoices.forEach((updatedInvoice) => {
        const index = state.findIndex(
          (invoice) => invoice.id === updatedInvoice.id
        );
        if (index !== -1) {
          state[index] = updatedInvoice;
        }
      });
    },
  },
});

export const { addInvoice, deleteInvoice, updateInvoice } =
  invoicesSlice.actions;

export const selectInvoiceList = (state) => state.invoices;

export default invoicesSlice.reducer;

//crud operations
