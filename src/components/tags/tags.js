import React, {useState, useEffect, useCallback, useRef, useMemo} from 'react'
import Tags from '@yaireo/tagify/dist/react.tagify'
import '@yaireo/dragsort/dist/dragsort.css'

const baseTagifySettings = {
  blacklist: ["xxx", "yyy", "zzz"],
  maxTags: 6,
  //backspace: "edit",
  placeholder: "type something",
  dropdown: {
    enabled: 0 // a;ways show suggestions dropdown
  }
}

const Tags = () => {
  const tagifyRef1 = useRef()
  const tagifyRefDragSort = useRef()

  const [tagifySettings, setTagifySettings] = useState([])
  const [tagifyProps, setTagifyProps] = useState({})

  useEffect(() => {
    setTagifyProps({loading: true})

    getWhitelistFromServer(2000).then((response) => {
      setTagifyProps((lastProps) => ({
        ...lastProps,
        whitelist: response,
        showFilteredDropdown: "a",
        loading: false
      }))
    })
  },[])
}
