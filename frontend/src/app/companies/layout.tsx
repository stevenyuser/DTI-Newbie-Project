import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'CUSoon - Bus Companies',
  description: 'Connecting Cornell to the world 🌎',
}

export default function CompaniesLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section>
        {children}
      </section>
    )
  }
  