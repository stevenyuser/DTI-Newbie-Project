import { BusCompany } from "../../../common/types";
import { CheckIcon } from '@heroicons/react/24/outline'

interface BusCompanyHighlightsProps {
  company: BusCompany;
}

const features = [
  {
    name: 'Invite team members',
    description: 'You can manage phone, email and chat conversations all from a single mailbox.',
  },
  { name: 'List view', description: 'You can manage phone, email and chat conversations all from a single mailbox.' },
  {
    name: 'Keyboard shortcuts',
    description: 'You can manage phone, email and chat conversations all from a single mailbox.',
  },
  { name: 'Calendars', description: 'You can manage phone, email and chat conversations all from a single mailbox.' },
  { name: 'Notifications', description: 'Find what you need with advanced filters, bulk actions, and quick views.' },
  { name: 'Boards', description: 'Find what you need with advanced filters, bulk actions, and quick views.' },
  { name: 'Reporting', description: 'Find what you need with advanced filters, bulk actions, and quick views.' },
  { name: 'Mobile app', description: 'Find what you need with advanced filters, bulk actions, and quick views.' },
]

export default function BusCompanyHighlights({ company }: BusCompanyHighlightsProps) {
  return (
    <div className="">
      <div className="w-3/4 mx-auto py-16 lg:py-24 lg:grid lg:grid-cols-3 lg:gap-x-20">
        <div className="my-auto">
          <p className="mt-2 text-3xl font-extrabold text-gray-900">{company.name} Highlights</p>
          {/* <p className="mt-4 text-lg text-gray-500">
            Ac euismod vel sit maecenas id pellentesque eu sed consectetur. Malesuada adipiscing sagittis vel nulla nec.
          </p> */}
        </div>
        <div className="mt-12 lg:mt-0 lg:col-span-2">
          <dl className="space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:auto-rows-max sm:grid-flow-row sm:gap-x-6 sm:gap-y-10 lg:gap-x-8">
            {/* {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <CheckIcon className="absolute h-6 w-6 text-green-500" aria-hidden="true" />
                  <p className="ml-9 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-9 text-base text-gray-500">{feature.description}</dd>
              </div>
            ))} */}
            {company.highlights.map((highlight) => (
              <div key={highlight} className="relative">
                <dt>
                  <CheckIcon className="absolute h-6 w-6 text-green-500" aria-hidden="true" />
                  <p className="ml-9 text-lg leading-6 font-medium text-gray-900">{highlight}</p>
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}