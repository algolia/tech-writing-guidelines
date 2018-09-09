import $ from 'jquery'

export default () => {
  const scrollspy = $('.scrollable')
  const navbarLinksItems = scrollspy.find('.navbar-links-item')
  const navbarSublinks = scrollspy.find('.navbar-sublinks')
  const contentSections = navbarLinksItems.map((index, item) =>
    $(
      $(item)
        .find('a')
        .first()
        .attr('href')
    )
  )

  let map = getSidebarMap()

  function getSidebarMap() {
    if (!navbarLinksItems.length) {
      return false
    }
    return navbarLinksItems.map((index, item) => $(item).position())
  }

  function getActiveSectionId(event) {
    const scroll =
      (window.pageYOffset || document.documentElement.scrollTop) -
      (document.documentElement.clientTop || 0) +
      250

    let elementPosition = 0

    for (let i = 0; i < contentSections.length; i++) {
      if ($(contentSections[i]).offset().top < scroll) {
        elementPosition = i
      }
    }

    return elementPosition
  }

  function expandSubSection(activeSection) {
    navbarSublinks.addClass('hidden')
    const hiddenParent = $(navbarLinksItems[activeSection]).parents(
      '.navbar-sublinks'
    )

    if (!!hiddenParent.length) {
      hiddenParent.removeClass('hidden')
    }
  }

  function updateCaret(activeSection) {
    expandSubSection(activeSection)
    map = getSidebarMap()
    navbarLinksItems
      .removeClass('animate-in')
      .addClass('animate-out')
      .removeClass('navbar-links-item-active')
    $(navbarLinksItems[activeSection])
      .addClass('navbar-links-item-active')
      .removeClass('animate-out')
      .addClass('animate-in')
  }

  if (!!scrollspy.length) {
    $(window).on('scroll load', event => updateCaret(getActiveSectionId(event)))
  }
}
