export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bookings: {
        Row: {
          cabinID: number
          cabinPrice: number
          created_at: string
          endDate: string
          extraPrice: number | null
          guestID: number
          hasBreakfast: boolean
          id: number
          isPaid: boolean
          numberOfGuests: number
          numberOfNights: number
          observations: string
          startDate: string
          status: string
          totalPrice: number
        }
        Insert: {
          cabinID: number
          cabinPrice: number
          created_at?: string
          endDate: string
          extraPrice?: number | null
          guestID: number
          hasBreakfast: boolean
          id?: number
          isPaid: boolean
          numberOfGuests: number
          numberOfNights: number
          observations: string
          startDate: string
          status: string
          totalPrice: number
        }
        Update: {
          cabinID?: number
          cabinPrice?: number
          created_at?: string
          endDate?: string
          extraPrice?: number | null
          guestID?: number
          hasBreakfast?: boolean
          id?: number
          isPaid?: boolean
          numberOfGuests?: number
          numberOfNights?: number
          observations?: string
          startDate?: string
          status?: string
          totalPrice?: number
        }
        Relationships: [
          {
            foreignKeyName: "bookings_cabinID_fkey"
            columns: ["cabinID"]
            isOneToOne: false
            referencedRelation: "cabins"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_guestID_fkey"
            columns: ["guestID"]
            isOneToOne: false
            referencedRelation: "guests"
            referencedColumns: ["id"]
          },
        ]
      }
      cabins: {
        Row: {
          created_at: string
          description: string
          discount: number
          id: number
          image: string
          maxCapacity: number
          name: string
          regularPrice: number
        }
        Insert: {
          created_at?: string
          description?: string
          discount: number
          id?: number
          image?: string
          maxCapacity: number
          name: string
          regularPrice: number
        }
        Update: {
          created_at?: string
          description?: string
          discount?: number
          id?: number
          image?: string
          maxCapacity?: number
          name?: string
          regularPrice?: number
        }
        Relationships: []
      }
      guests: {
        Row: {
          countryFlag: string | null
          created_at: string
          email: string
          fullName: string
          id: number
          nationalID: string | null
          nationality: string | null
        }
        Insert: {
          countryFlag?: string | null
          created_at?: string
          email: string
          fullName: string
          id?: number
          nationalID?: string | null
          nationality?: string | null
        }
        Update: {
          countryFlag?: string | null
          created_at?: string
          email?: string
          fullName?: string
          id?: number
          nationalID?: string | null
          nationality?: string | null
        }
        Relationships: []
      }
      settings: {
        Row: {
          breakfastPrice: number
          created_at: string
          id: number
          maxBookingsLength: number
          maxGuestsPerBooking: number
          minimumBookingLength: number
        }
        Insert: {
          breakfastPrice: number
          created_at?: string
          id?: number
          maxBookingsLength: number
          maxGuestsPerBooking: number
          minimumBookingLength: number
        }
        Update: {
          breakfastPrice?: number
          created_at?: string
          id?: number
          maxBookingsLength?: number
          maxGuestsPerBooking?: number
          minimumBookingLength?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
