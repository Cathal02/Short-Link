import React from 'react'

import PrivateHeader from './PrivateHeader'
import AddLink from './AddLink'
import LinksList from './LinksList'
import LinksListFilters from './LinksListFilters'
export default () => {
    return(
      <div>
        <PrivateHeader header='Your Links'/>
        <div className="page-content">
          <LinksListFilters />
          <AddLink/>
          <LinksList/>
        </div>

      </div>
    )
}
