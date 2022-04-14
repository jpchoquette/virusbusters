// import VueCookies from 'vue-cookies'
const state = {
  userCustomizations: [],
  activeWallpaper: null,
  activeCursor: null,
  activeTheme: null,
  activeWallpaperDisplayStyle: null,
  wallpaperSize: '60%',
  cursorStyles: [
    {
      template_id: '00000001',
      name: 'Infected cursor',
      public: true,
      type: 'base',
      customCursor: true,
      class: 'cursor-infected',
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAdJJREFUWIW1lr9uwjAQxj+HCsaKqTOdYOtUlrIUNVs78Qp9Kl6BqWMiusCSTt3IBHMnxJhIER1SW3biP+c4/aSIODa+35199jEY9DJ9upr60nzP5Pbz5FEZ+3n6YiBKDLQZtKkqSgxGw9Y3KgRzGU+yjXiP5yvjRMlhBwBY3s8xGA3JEIwbT/Ix4ulZa1gnGUY2vj1mXhBRVZRIso2XcaAOs2w8ni2wPd3Vv8dM9LsUDUZDa2ipSg47xNOzAKIqak1E8J6rKkrEs4UCAdRLQQZoppSvqqJUDPL1549LDACueL0CqENIjcDtO5aTH9G0GbM5qQAIXdZWw81xy4c3Zcj2+6O1r0wQ4hxI8rHZqE42yD9RICJ+Dshp2IdxgLah1SxwTXxZK2P6SN8b/iJoid7x/8TzlVfqGgFCxCNhuzeMm1DcBRYvXF66lsKWhq2TsG+5DjoygPUqbkQnzfeMP655/yUCPsWNAKCklE8UqBDKZRSa110gtCWZqwzzqZa4nHeBi7QPCB2I0nCV4rZI+YDIEJGpQ/e9S/Gig5Qd8Z6wSxS45GhwZzqVY31CdDqImksRkr5BBalu0/pcWmm+Z0EAJgiKgvZAKIS8hL0A+EA0988vLQwHs4Qq7J4AAAAASUVORK5CYII='
    },
    {
      template_id: '363830',
      name: 'Golden cursor',
      rarity: '',
      type: 'dust',
      customCursor: true,
      class: 'cursor-golden',
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAcdJREFUWIXdl7FOw0AMhv9UYmxZWSuGrqgSYQPRTF2QIuVVWHkNXgIJqQtTKzGSAboyoL4DHRnKEDlxLvadkzQM/FLVNOnd/8V2bCUCgMU0PoBps8sj/JEi11zTUFAlwHq7wv31be3i+/d4cKgaAFZnAICn5xhvX3txQQiqLVgd4OcGePksIUgajBXIBxUBRRGut6vijALB5QOyQHGYEgBoRoGkgfSBIggZAOgEYQUimM0uj0aNqyevxfdyVjudpTmyNDcDXJ2Py49kThoRibiLA0EgbUUg3Jw8axFILu4Gg3j8qI75DTdTAFRpOBKEZq4DGGWB4OaSSoBg9xKiEIJw71zyaERArAMDhAsS6gsqQCm3DgIQkvl8ssd8UhwvpvFBmrzdamA58xam++wTBIH0B+AgHggOokE0ikJsyyE5bZtE7dutB96K/QBAbwgC0SD6pYDLU5xZmotz4bgABBHoF+5MEJuPNQ3J5SnU/ykpSR6qsS6PY6PIHGDNi/cOIRKuOdAxBdzcCiGZdwJwzflmGoRmDig1AMh14DPnzUVbYxpGmnzm7m+KRMgcMEaAT8jQ2JYGjm9Nq82sbzx8Xe/XN22M/hv9AlwGE9WQ3nqRAAAAAElFTkSuQmCC',
      options: {
        dustColors: ['#ffec27', '#ffa300', '#fff'],
        charList: ['+', '+', '+'],
        randomColors: false,
        randomChars: false,
        fontStyle: '20px Red Hat Text',
        distance: 80,
        gravity: 0.01
      }
    },
    {
      template_id: '374743',
      name: 'Mad Buster Cursor',
      disabled: false,
      rarity: '',
      type: 'dust',
      customCursor: true,
      class: 'cursor-mad-buster',
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAe1JREFUWIXFVz1PAkEQfUvooVQ6GmoSDD8A6oOKYEKBjfEnUBIbE/6CVBQmohVSS6xJTIylDbGS0vsFZ3Husl+zt3uAvuSyCzs7783O7FwO+GcwAGhVm4m+sNqsWaAv7iNoX5FPnt+exJ/teodyrhMYwkOFFOQf7XrHRu4SY2DY7/rw2gX8gknHn3BCzbHxPx9n84Vh4yWAR77arBUDPaKsCHOdwGqzZvwBgAQRxqjtReQrxCiUBNFuGoCLfgGz+QLDflcZbRw+AoLIaedLkodDKUIp+kODDMh2Cw4SfeooErXQQMlqw7QNByM3idJ0jFFj1/hwC+DGZEpGg3Sc3DnJJL9i/opv1kBZ2BThgO7IEDUagE3Oyf22ABooK63aKoBvtAkQ0VOk8TadlC6ddhy2IkwRT5HEW+WxEo7uyTUCDFLqnSkQO0ongsyKm5cQcuVkdQHySygIyimYx892k6V9QTiSO2E8VRddkRI3gvNY6wlZKdAjySjAPKCLUMcRyAHH2/AWn7jCe+7OKPUAo/BkGCmgDPeBy6d3CngvaFWbxujkzhRHoIdTPOIrAfxf03KkcgpcJ0Degh4qeMCZF7GF1BtkCnqoBDvLA69WnBNeHybHFOB1o7IE6FFQfSH0OzJ8o1ZgxvffMfrHn+AHJXOmdOwnim0AAAAASUVORK5CYII=',
      options: {
        dustColors: ['#422136', '#000'],
        charList: ['!', '@', '#', '$', '%', '?', '&', '&'],
        randomColors: false,
        randomChars: false,
        fontStyle: '30px DayDream',
        distance: 100,
        gravity: 0.02
      }
    },
    {
      template_id: '376011',
      disabled: false,
      public: false,
      name: 'Glitched Cursor',
      rarity: '',
      type: 'ghost',
      customCursor: true,
      class: 'cursor-glitched',
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAgVJREFUWIW9V71uwjAQ/hzRrqxUYmED9pYlVQdItnbiUboxs/EGvAIsjGkZqrKk7FUfAAlQp6hjB3cAR2fHhnOAflNyvvi++7UjQBA1QwkAyWBBxYiHIV6+FgIXQKAMK+MuHFs3dbn6gc/GvuAQqdCXJJ3sHmY12OSiqst9iLhSKPK8K+MHIKo1Vh3IbCMBIO70NbmNRMDZsCySdKI5ZkuJoIuUYWsqNcX64B7J4lsz0L2tFozOlxlw9VaQu6KRdwHDoZNgpljZvGgKOCS0LlDFAwDtV8vHvw+abL7MnMY4BQgAQuLRGv72dKa9f/a2BQJO7GuAQ8JJANmYZ+wIKImzt6HpYRlUXAvm0JHZRhYn5AZxp88aYhRRM5Sr4fthAj5QkaBEuEV4MoEkneTGXCk5dJTnNdBtbNFtbE/l42UccEUgG0MCWnfEnT6SgX0TGgWOUYoAwNk99xntZxvFrllvg+oAYH8aUmVbS9HwHms5TvXTk7ZAwDRiq2xfEiaR1lTKm+eOmwAHZUgoIpRAoISuyrXJfSafubfpbMVUpgrqQ1MOWO6Hqzs9iuo4rx8mWJgDnB4ucwiZs0KB3Ybn+DOiqVuPUqxHqd8cuMTvWakNo2YozUIUP0925fqHAHbHuW1GlPaI3h+V8ah3XdBTUTOLWMlLE1BRoJ7bCNhAU/nvVzKzjv4A1McWXZcxVBgAAAAASUVORK5CYII=',
      options: {
        images: ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAgVJREFUWIW9V71uwjAQ/hzRrqxUYmED9pYlVQdItnbiUboxs/EGvAIsjGkZqrKk7FUfAAlQp6hjB3cAR2fHhnOAflNyvvi++7UjQBA1QwkAyWBBxYiHIV6+FgIXQKAMK+MuHFs3dbn6gc/GvuAQqdCXJJ3sHmY12OSiqst9iLhSKPK8K+MHIKo1Vh3IbCMBIO70NbmNRMDZsCySdKI5ZkuJoIuUYWsqNcX64B7J4lsz0L2tFozOlxlw9VaQu6KRdwHDoZNgpljZvGgKOCS0LlDFAwDtV8vHvw+abL7MnMY4BQgAQuLRGv72dKa9f/a2BQJO7GuAQ8JJANmYZ+wIKImzt6HpYRlUXAvm0JHZRhYn5AZxp88aYhRRM5Sr4fthAj5QkaBEuEV4MoEkneTGXCk5dJTnNdBtbNFtbE/l42UccEUgG0MCWnfEnT6SgX0TGgWOUYoAwNk99xntZxvFrllvg+oAYH8aUmVbS9HwHms5TvXTk7ZAwDRiq2xfEiaR1lTKm+eOmwAHZUgoIpRAoISuyrXJfSafubfpbMVUpgrqQ1MOWO6Hqzs9iuo4rx8mWJgDnB4ucwiZs0KB3Ybn+DOiqVuPUqxHqd8cuMTvWakNo2YozUIUP0925fqHAHbHuW1GlPaI3h+V8ah3XdBTUTOLWMlLE1BRoJ7bCNhAU/nvVzKzjv4A1McWXZcxVBgAAAAASUVORK5CYII='],
        decay: 100,
        fade: false
      }
    },
    {
      template_id: '391698',
      disabled: false,
      public: false,
      name: 'Dangling Lights Cursor',
      rarity: '',
      type: 'spring',
      customCursor: true,
      class: 'cursor-christmas1',
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAatJREFUWIXFlz1Ow0AQhd9GKA2RUlBQR7hECqKgoYMjcAaOwCl8BM6CuzQuEJZSErmmREoaGmgy1uxkZn/8I0aKlGzW+759MzsrO7B4WN39IhBVW7vQ/32iWzAmPhWI08Tf2ktv0uPqazIYx8WlsIwpQDqAmHgKTB8IG+D71f+9fE4CyYWYqaNSnMaUcQmeU8w2gLFbC24IhA5AEPTpATEcQIOZACINgINo35VITUMHEDrjJxBM/GX9mfacBTCkk2niuWnwUpDswlG8bIossSjAf8QM8LuX5QK3O3X3KYVoXsdaLglCikugnPZ8xifFiEnEAgGAi6cFgAUA4OZ9F1oOAHMASHOBB09L2RRHcT8IwnLBK0I5KXYqyqboXNDED9sm+DwgHKDIdcISP79eAwi7YBaHVQ8SRorTrkmcA2gQ0S4YK8yP2ytPnAvzsFzIasMaDAGExEMQve4BCbKZ76PiFkCvVly1teOL3P+cFmFqDLoLOESs6VhHcvBlFIM4bJtgPxjlNrS6HBe20jTqyyYvzs183wnTSZEOVW3tRn/btfqGBTE6QAhEg/gDa07ki0ZdwH0AAAAASUVORK5CYII=',
      options: {
        images: [
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAgCAYAAABkWOo9AAAAAXNSR0IArs4c6QAAAdRJREFUWIXFmD9OwzAUh39FiKVIjMwRHSulYsjCFm6CxBFyihyBM3AE2FgYqkbqmKozAwNSu7CEoXrh+dX/EtvtJ1WK1cb58vOz43QCT8qs6Oh4dX8HAFgsN0e/e99+Tnz7HIJ3p1wUsMsC8YUHdWaT/bjaAQAefq/772PKjuqIC5MgAEzneX9MSceSvQg52STJkaMwliBR4CCok6SyAOLIBomaUiRiygYn6oKXR5kV3VjhpKL7dYPpPFeSBcYJj56RdCEpISUJ03pLuFaHYFFAld2vGwDH9fv9ulPaj9mXtl+TcNAaJ1OVKZokJVJaJxtUo9ThYrkxSj61K2c/b9tbpa2r32iTyZZklbeo8tZ6vks2WJSnqpMEgLqZoW5mTmEpy7kMFeWQrOmCdTMDgF6W2ibKrOgoiChDb1taKEmiylslYYnpJqPVqM8uiSQJU6Jclmo1+SM0FicTlWm6kCWQRFT31BkiKSmzojtJoorkz8vh4wFPNaqoc0JxQU9ZIlmi2k3HzbPaHpBu0qH3kgX+hS3S0UXl8HvLEgbZJIl6y+qEDTeR5O8XQrdds208dNBNJhUF7G+fLmk+EslFiSHCuh3/yUQ5Q95Aqd7PIkq4hPmk/AOzieO2pKYhrQAAAABJRU5ErkJggg==',
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAgCAYAAABkWOo9AAAAAXNSR0IArs4c6QAAAcpJREFUWIXFlz9uwjAYRx9QsYC69QBRVypQB0TFUnGViqnnYUK9CuqCqBiqorJWHIANwYJU0YE6coz/JbHDm5JgOY/f5y+J4UqMkv5plPRPvuNrMWVMqIKzzdLpUY+nE5abmJO7Svv1eH8+2Cydc0UR9Vl7QrL3+cPMY87gorJkmhhwWK8AGB7bGUlfgomqKcqSAK1Ol8N6xby5p0U+SQgg6hLUIUv6dDyU7Hq1zPPm3jq+1ekCOMfp8E7U1iAiRVFeIaRDjMmLVTTPm0MVsckOj23Av+xgETVJ/r7eXV5c+N6uONp/pEpq5RS+F7eZc12qRZpIcDG4iKTAJltGEhTRIpIf003mXE3xsF6la7KoJFjWqE5SlQIYjJP0t/PxLpNsCMmMqJymKcnBOJGEzDw87WhMtplrZSTB84H/Pn5Lj4WsnK5LvqwkaETVNIWkKiuEq6IO5memLKfDZymESBMspVcln6cv3pOq6zMEdZ8mMklWlSYYEnWVXODq/pCkonnTNBGj7BB4FypLhiw7BBSNlaRAKyrK7VP2xmQb/C2ko+bT9SZ0KcaQhIKbO1OZY0nC/2eeb6rXEBSkNyiyP6pCUGD9cNZRpZzMHztY4DpuMnUeAAAAAElFTkSuQmCC',
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAgCAYAAABkWOo9AAAAAXNSR0IArs4c6QAAAd5JREFUWIXFmDFrwkAUx/8p4mKhUCitUwkuDoLVIUu34Hft1G8QMhTskKFWcHApGbUUChZdSiGdXnm+3MW7yyX9TQnemR//9545DPBPxGFUnFqT5llA10HVQt+YyElIthVRnWCaZ7OKPQlbFzQq6iIo9v/JdnxJKR5SkjQVVHFWT0eNq2Sx2yb8nu/xnqiUNE2RJIvdNgkubkp7GkmUqFNqiVdRnqZPSaChRG0lZW8SfOobLT1n0h8qZSSq/gQ8ila9dSb9YbLYrJUCJmmmeRZ4T9Sm7FJSlybgKVGTNE+VXidJ7/rWenSxWc/iMEq4MMlJSV52oraoTW+meTaT6VaVm1PrzcQlX6cDAMDldJB8Pj6UHi5LrxswOUR07Xx64pLz7h690fjo89vnxdG9bup1kl5EVUkeVsuS7M/HO76eUusjnZQEHHpUJQkAvdEYh9XyaG3n6tr0OyslActESZILSlTJqnpWNdk6SaDBgzNHJyXRSQIWopTmvLtHr2IdtYBM1UWO45ToKREue/fyZi2lwnqY7r/PAaA0OKp1viQBw0RLk14hyeWA+oKEVaI07bpUZYK+JAHDn6c4jAqSlImp8ClIGJXeVLIJQcJItKm+s6G182hrxGFUuPwb54tfqwb7E+R7uJUAAAAASUVORK5CYII='
        ],
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAfJJREFUWIXFl71qAkEUhc9qSBMhYAKpJYWNoKSwsVrzCHmGPFWeJVqlsZAINilk64AsBGIjLJPGO9yZvXdm1h9yYGH/zzdnZu7OZmCa9sYGAc2KRRa6fozsC2PmlwLJJPP34sG56bn3fTGYjJv7xr6agpht3wBAdv+lQlqAmHkKDIdIMQeAK/XKz5t7fPvqHBIwB5n2xoZDxMwBoJVkTueE835ylKhkbrZ9Q1sYwGttDE6D8I0JjMPJAARB2xEQXGQqpaIDSDAnQGhKA+Ag0r6g1MJmAUJzvAbBzOfddtpzGsAplUwyb9oNThckp3Awz8uqkVkU4D/UAtwSqqXA405tfcpAFBOQIPKywrzbrpnT+WMh7LdgViyy2M1kTIZSCncvHQAdAMBouQm9DgBbkEi0sRHNW56X1cHcFUFos83pAv+m2KzIy8qmIJnv1qvg84CXAKlpEpr5zWAIIJyCWoS08eDD+ObUajLnABJEdAUTG5ifT4+OOTfm0lJoVIYlGAIImYcgjvoO+CAf179Rcw3AmQX+cknTrFhk/CWTfX0QpqpWCVMWkhyE9mNFR5uSFkBqeWoaIYjdehWsBxZAW7OlSKty3FjrprN9jglitNxgtNxY88m+g5vB0JmuXMEWm23fNE1FqxsE4M+Es/9uh0AkiD8mBR7HkZyb5gAAAABJRU5ErkJggg==',
        emoji: '🎄',
        particleType: 'image',
        nDots: 7,
        hideTrailOnClick: false,
        resistance: 10,
        gravity: 50
        // mass: 2
      }
    },
    {
      template_id: '404438',
      disabled: false,
      public: false,
      name: 'Lost Mitten Cursor',
      rarity: '',
      type: 'dust',
      customCursor: true,
      class: 'cursor-mitten',
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAXtJREFUWIW1l7FxwzAMRb+4gErX3sCVB4h6b6GpsoV7eQBX3kB1ykyQFDnoQBgACZL5jXnU0f/xE6SoCY4+ztcfrf+xPydvXETqH1nG/wHzNliab/spe76cv4ZCZAO5uTSWkiCtEMegiLkF0gIx9ZiPgEhV5t+f+a8QHxcpYABIrjkZzutfe15NkJbkMgBVZCyhCMRQJAUbQM5emhdSqIWwAciYg5Cxk0J0KfwE5vV9xtRnFCRXTQp+AhyE+mQiiiIpHADaEatGXTl7giilkNyDQ6ZQMXtNHsSQk9BT6ZRM8oG6FIOkJaG+jIBBSbBaWS63o80nnKQ5GXcnIQp1e92PNvfLtiGZd0Mou2S53DIIFUCDCUMY5pYyAGm27adYLTjm2+uugnTfiFrMeRGad8IQSKM5IJag6WLZYQ5Ufhe4SQiAiLkJoEFY4lsrag442/CxP6eWJYmYA04CJWW7RkmhxhwoXUorRaZRc6AjAZJWK5GlG/KZzSGidfMLX+H40lpcAWoAAAAASUVORK5CYII=',
      options: {
        dustColors: ['#fff'],
        charList: ['•', '*'],
        randomColors: false,
        randomChars: false,
        fontStyle: '20px DayDream',
        distance: 80,
        gravity: 0.01
      }
    },
    {
      template_id: '444233',
      disabled: false,
      public: false,
      name: 'Banana Cursor',
      rarity: '',
      customCursor: true,
      class: 'cursor-banana',
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAXFJREFUWIW1lzFSxDAMRf8y9DkDVeotdg8AVXqfYWf2RMzkDJmhpIIDQEFNxRl8Aih2TBxFkiXH+VU28UZP8retHKDo8eH8Kz17//k4aP+1Sn2JBtAKxgRwPc73nr/agtx7BocxImS/p0uHMEY8nToAM7AHxDwFb5/xdvH6DQz9amyCSLJCFAd5ICiIBcJEuSeEea5ECKA4JRqEy7UsRAKphLjzAOQvoabLNV26NaQgFwCF+NfQz9OB23KlkjY1N4BXpSq0AyBVsGoTgOaDXQFanYTVAFTJ9aV7zQCSo5PBONeHMZog2pmQ2Yw4sM0A1ibFquoKWHa55gA12ZeWqqkjooFX2StHc5K0dFUALuOa4JpWAFqZ8+bUIstOuSiLFFw0HMk+Nak0uLkhoW24uI6VTsgTHFA8EMa4zDA/6UjgmsyT2Aqs2i0mKCdvcEDYBxbmGXpML+ddggNMU2paekzQmuAsgARhUU2fsPnreGtz8gcHgL+Q9D4EqQAAAABJRU5ErkJggg=='
    },
    {
      template_id: '445032',
      disabled: false,
      public: false,
      name: 'Upgraded Banana Cursor',
      rarity: '',
      type: 'dust',
      customCursor: true,
      class: 'cursor-banana',
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAXFJREFUWIW1lzFSxDAMRf8y9DkDVeotdg8AVXqfYWf2RMzkDJmhpIIDQEFNxRl8Aih2TBxFkiXH+VU28UZP8retHKDo8eH8Kz17//k4aP+1Sn2JBtAKxgRwPc73nr/agtx7BocxImS/p0uHMEY8nToAM7AHxDwFb5/xdvH6DQz9amyCSLJCFAd5ICiIBcJEuSeEea5ECKA4JRqEy7UsRAKphLjzAOQvoabLNV26NaQgFwCF+NfQz9OB23KlkjY1N4BXpSq0AyBVsGoTgOaDXQFanYTVAFTJ9aV7zQCSo5PBONeHMZog2pmQ2Yw4sM0A1ibFquoKWHa55gA12ZeWqqkjooFX2StHc5K0dFUALuOa4JpWAFqZ8+bUIstOuSiLFFw0HMk+Nak0uLkhoW24uI6VTsgTHFA8EMa4zDA/6UjgmsyT2Aqs2i0mKCdvcEDYBxbmGXpML+ddggNMU2paekzQmuAsgARhUU2fsPnreGtz8gcHgL+Q9D4EqQAAAABJRU5ErkJggg==',
      options: {
        images: [
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAXFJREFUWIW1lzFSxDAMRf8y9DkDVeotdg8AVXqfYWf2RMzkDJmhpIIDQEFNxRl8Aih2TBxFkiXH+VU28UZP8retHKDo8eH8Kz17//k4aP+1Sn2JBtAKxgRwPc73nr/agtx7BocxImS/p0uHMEY8nToAM7AHxDwFb5/xdvH6DQz9amyCSLJCFAd5ICiIBcJEuSeEea5ECKA4JRqEy7UsRAKphLjzAOQvoabLNV26NaQgFwCF+NfQz9OB23KlkjY1N4BXpSq0AyBVsGoTgOaDXQFanYTVAFTJ9aV7zQCSo5PBONeHMZog2pmQ2Yw4sM0A1ibFquoKWHa55gA12ZeWqqkjooFX2StHc5K0dFUALuOa4JpWAFqZ8+bUIstOuSiLFFw0HMk+Nak0uLkhoW24uI6VTsgTHFA8EMa4zDA/6UjgmsyT2Aqs2i0mKCdvcEDYBxbmGXpML+ddggNMU2paekzQmuAsgARhUU2fsPnreGtz8gcHgL+Q9D4EqQAAAABJRU5ErkJggg==',
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAfhJREFUWIW1lr1uwjAQxy9VOvMKZahY6RDGRiITCxN9hUrdu3Zp1z4BrwBTl05BKiMsrBUDfYXMDHQgNnfnO8chyV9CgGP7fr4vJwKkcX90ggCtDpsoZF6IojqGNTUBiiTj+e7LnblfQ/b0ea0dKw5LAIjh/Rrg/tGBsGMNgDBE7Bg3RrBxDlP+zxdAIDTPAdB55tCrwya6cRagE5IxA4G+K42j/fLFq/g4Fkc5CD69gUDKtwXAMZX3uf2xawyEAR/3RyfrgWw4dTYmBjUgAMiSHvkQGTAe1lIkBCSpeAiwcQlUAbIQyEM4HEF9QIofif+2sIbVPbbFORzlQcz6GOCcjT6I0HIzICrMMb1AlFI7WGh3zN835x+Tgfgcg1gvcA94DbDm5Lp+APD9G8IKWdKDfEfH3D4AyunLxMNutproEM78Y0oOIQLYxby53L35pgdB4JDInVASKju8AUk0JQc0mfvAC5ANp5c/ntMvn/XyM8JewJdRmAcAAP4+xOEs6cFsXm6u5IIPMAxAaKF1ZAGvBkASq6CBRAAcI5sHyAttQqge4BAkIVuUNwT8/U27cn2XUCMACSL0Wagq74K2DGmqXQV1hOtfC1OnAFL9c292CmDkS9LOAfjtx583Ti787vDycBmfzYtK460AcAhJvipqrbw0iKoS/gealfGS05DAWQAAAABJRU5ErkJggg=='
        ],
        decay: 100,
        fade: false,
        spin: true,
        particleType: 'image'
      }
    },
    {
      template_id: '453601',
      disabled: false,
      public: false,
      name: 'Cat Paws Cursor',
      rarity: '',
      type: 'spring',
      customCursor: true,
      class: 'cursor-paw',
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAX9JREFUWIWtl7uNwzAMhiUjixjIDC5TuMgEqS4DeCYPkFSZ4IoUV2aGABnFVwQSKIov0forw5T8f5JJPWLYqXmcNur98/OKlv5sI+7DrdJAyGCr+fp7y8/L+doEUQWwOfw4ZULFKRAOonhpMYcGUtwKwQJoH4c6/t3z8/v0w0KYAbC5ZABjHoih6o2EDShDrY8kFcBscFnY9nBGcZ4NXMBqkKf7sX7bCCCUImcOqfOI08cfq5gLOJZE5UK0lp7FQJMK0FJ6XiWIBHCgzK2j1bJd6juP0/b8vGJVBday61WOpjL0rAVcW/ybeQCmnFrMNc3jtGWAlBx767pV5AwUEKDme40e/oZqIZJK0QOgLUoHMqrpsnxnx2gmaQih3CKpI1WllB9OQQ8yBziIYoQoSb3LcwbABwXzTBC/QhLeD4oZsEBQI/WOPgTjsbzXJkXuhlzjnhDSXUG8tfSA0C4q6v3NAyElMM4z0wVSO7JpppRxEwAHYZHrcroXxHo1DyGEf3Zn6PH3XVv6AAAAAElFTkSuQmCC',
      options: {
        images: [
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAWNJREFUWIW1l70RwjAMhR3PQAElS2SAFCzBHS0lK7AGA7AERQZgCcqkyA6hck5x9PRjw6tytmJ9enYcuwmV6o7tzLX3n3djeR8GoYG90kDYTm/yx+u5PF9PZxfEpiNPTgfnknD9HAiCiN7kUrsUg1yNXKMlSernLLeOAQEsL1rjaAznAnTAI8kFTdUAtS5E1OFVqQuRS+4drMaFiD69mnn1aLUGUvISCFrhME5qzAYg76xx4rDfQYik5Lz4FfwbQgWgECXiIPLxTPtALQRSd2znBaB01VtsluTaCblk1rmmoo5G+p/WXEDJJAgNzv0v8EJoDi3V0x3RsuiGcRIXmBRPnWYdyKcCVeYRcmJ1TpOOZN6KkWhx/efdrBzID440GFVQuviSTMdyzQnkTt6eVw8BNAhOEsT9ctu0qwC/gtAuKur9zQuBknLJTQAcBAei7aLoZmQCQBAWFV1Oa0GsV/MQQvgCy3LxyyqU4YYAAAAASUVORK5CYII=',
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAX9JREFUWIWtl7uNwzAMhiUjixjIDC5TuMgEqS4DeCYPkFSZ4IoUV2aGABnFVwQSKIov0forw5T8f5JJPWLYqXmcNur98/OKlv5sI+7DrdJAyGCr+fp7y8/L+doEUQWwOfw4ZULFKRAOonhpMYcGUtwKwQJoH4c6/t3z8/v0w0KYAbC5ZABjHoih6o2EDShDrY8kFcBscFnY9nBGcZ4NXMBqkKf7sX7bCCCUImcOqfOI08cfq5gLOJZE5UK0lp7FQJMK0FJ6XiWIBHCgzK2j1bJd6juP0/b8vGJVBday61WOpjL0rAVcW/ybeQCmnFrMNc3jtGWAlBx767pV5AwUEKDme40e/oZqIZJK0QOgLUoHMqrpsnxnx2gmaQih3CKpI1WllB9OQQ8yBziIYoQoSb3LcwbABwXzTBC/QhLeD4oZsEBQI/WOPgTjsbzXJkXuhlzjnhDSXUG8tfSA0C4q6v3NAyElMM4z0wVSO7JpppRxEwAHYZHrcroXxHo1DyGEf3Zn6PH3XVv6AAAAAElFTkSuQmCC'
        ],
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAX9JREFUWIWtl7uNwzAMhiUjixjIDC5TuMgEqS4DeCYPkFSZ4IoUV2aGABnFVwQSKIov0forw5T8f5JJPWLYqXmcNur98/OKlv5sI+7DrdJAyGCr+fp7y8/L+doEUQWwOfw4ZULFKRAOonhpMYcGUtwKwQJoH4c6/t3z8/v0w0KYAbC5ZABjHoih6o2EDShDrY8kFcBscFnY9nBGcZ4NXMBqkKf7sX7bCCCUImcOqfOI08cfq5gLOJZE5UK0lp7FQJMK0FJ6XiWIBHCgzK2j1bJd6juP0/b8vGJVBday61WOpjL0rAVcW/ybeQCmnFrMNc3jtGWAlBx767pV5AwUEKDme40e/oZqIZJK0QOgLUoHMqrpsnxnx2gmaQih3CKpI1WllB9OQQ8yBziIYoQoSb3LcwbABwXzTBC/QhLeD4oZsEBQI/WOPgTjsbzXJkXuhlzjnhDSXUG8tfSA0C4q6v3NAyElMM4z0wVSO7JpppRxEwAHYZHrcroXxHo1DyGEf3Zn6PH3XVv6AAAAAElFTkSuQmCC',
        particleType: 'image',
        nDots: 3,
        resistance: 50,
        gravity: 80,
        hideTrailOnClick: true,
        customCursorOnClick: true
      }
    },
    {
      template_id: '453602',
      disabled: false,
      public: false,
      name: 'Upgraded Cat Paws Cursor',
      rarity: '',
      type: 'spring',
      customCursor: true,
      class: 'cursor-paw-upgrade',
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAX9JREFUWIWtl7uNwzAMhiUjixjIDC5TuMgEqS4DeCYPkFSZ4IoUV2aGABnFVwQSKIov0forw5T8f5JJPWLYqXmcNur98/OKlv5sI+7DrdJAyGCr+fp7y8/L+doEUQWwOfw4ZULFKRAOonhpMYcGUtwKwQJoH4c6/t3z8/v0w0KYAbC5ZABjHoih6o2EDShDrY8kFcBscFnY9nBGcZ4NXMBqkKf7sX7bCCCUImcOqfOI08cfq5gLOJZE5UK0lp7FQJMK0FJ6XiWIBHCgzK2j1bJd6juP0/b8vGJVBday61WOpjL0rAVcW/ybeQCmnFrMNc3jtGWAlBx767pV5AwUEKDme40e/oZqIZJK0QOgLUoHMqrpsnxnx2gmaQih3CKpI1WllB9OQQ8yBziIYoQoSb3LcwbABwXzTBC/QhLeD4oZsEBQI/WOPgTjsbzXJkXuhlzjnhDSXUG8tfSA0C4q6v3NAyElMM4z0wVSO7JpppRxEwAHYZHrcroXxHo1DyGEf3Zn6PH3XVv6AAAAAElFTkSuQmCC',
      options: {
        images: [
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAWNJREFUWIW1l70RwjAMhR3PQAElS2SAFCzBHS0lK7AGA7AERQZgCcqkyA6hck5x9PRjw6tytmJ9enYcuwmV6o7tzLX3n3djeR8GoYG90kDYTm/yx+u5PF9PZxfEpiNPTgfnknD9HAiCiN7kUrsUg1yNXKMlSernLLeOAQEsL1rjaAznAnTAI8kFTdUAtS5E1OFVqQuRS+4drMaFiD69mnn1aLUGUvISCFrhME5qzAYg76xx4rDfQYik5Lz4FfwbQgWgECXiIPLxTPtALQRSd2znBaB01VtsluTaCblk1rmmoo5G+p/WXEDJJAgNzv0v8EJoDi3V0x3RsuiGcRIXmBRPnWYdyKcCVeYRcmJ1TpOOZN6KkWhx/efdrBzID440GFVQuviSTMdyzQnkTt6eVw8BNAhOEsT9ctu0qwC/gtAuKur9zQuBknLJTQAcBAei7aLoZmQCQBAWFV1Oa0GsV/MQQvgCy3LxyyqU4YYAAAAASUVORK5CYII=',
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAX9JREFUWIWtl7uNwzAMhiUjixjIDC5TuMgEqS4DeCYPkFSZ4IoUV2aGABnFVwQSKIov0forw5T8f5JJPWLYqXmcNur98/OKlv5sI+7DrdJAyGCr+fp7y8/L+doEUQWwOfw4ZULFKRAOonhpMYcGUtwKwQJoH4c6/t3z8/v0w0KYAbC5ZABjHoih6o2EDShDrY8kFcBscFnY9nBGcZ4NXMBqkKf7sX7bCCCUImcOqfOI08cfq5gLOJZE5UK0lp7FQJMK0FJ6XiWIBHCgzK2j1bJd6juP0/b8vGJVBday61WOpjL0rAVcW/ybeQCmnFrMNc3jtGWAlBx767pV5AwUEKDme40e/oZqIZJK0QOgLUoHMqrpsnxnx2gmaQih3CKpI1WllB9OQQ8yBziIYoQoSb3LcwbABwXzTBC/QhLeD4oZsEBQI/WOPgTjsbzXJkXuhlzjnhDSXUG8tfSA0C4q6v3NAyElMM4z0wVSO7JpppRxEwAHYZHrcroXxHo1DyGEf3Zn6PH3XVv6AAAAAElFTkSuQmCC'
        ],
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAX9JREFUWIWtl7uNwzAMhiUjixjIDC5TuMgEqS4DeCYPkFSZ4IoUV2aGABnFVwQSKIov0forw5T8f5JJPWLYqXmcNur98/OKlv5sI+7DrdJAyGCr+fp7y8/L+doEUQWwOfw4ZULFKRAOonhpMYcGUtwKwQJoH4c6/t3z8/v0w0KYAbC5ZABjHoih6o2EDShDrY8kFcBscFnY9nBGcZ4NXMBqkKf7sX7bCCCUImcOqfOI08cfq5gLOJZE5UK0lp7FQJMK0FJ6XiWIBHCgzK2j1bJd6juP0/b8vGJVBday61WOpjL0rAVcW/ybeQCmnFrMNc3jtGWAlBx767pV5AwUEKDme40e/oZqIZJK0QOgLUoHMqrpsnxnx2gmaQih3CKpI1WllB9OQQ8yBziIYoQoSb3LcwbABwXzTBC/QhLeD4oZsEBQI/WOPgTjsbzXJkXuhlzjnhDSXUG8tfSA0C4q6v3NAyElMM4z0wVSO7JpppRxEwAHYZHrcroXxHo1DyGEf3Zn6PH3XVv6AAAAAElFTkSuQmCC',
        particleType: 'image',
        nDots: 3,
        resistance: 50,
        gravity: 80,
        hideTrailOnClick: true,
        customCursorOnClick: true
      }
    },
    {
      template_id: '473469',
      disabled: false,
      public: false,
      name: 'Butter Knife Cursor',
      type: 'base',
      customCursor: true,
      class: 'cursor-knife',
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAABSZJREFUWEeVV01vG1UUPW9MyoIAQlB5BiE8XiAlEhJImQ+EUOwkQl3FdBXUsmRJ/wkrJLquEK1QWyD+WECLEjuVEIrtVCCUFqmLsasuQFlAVRZNIfOqe9+b8cx4/NFZjWfee3Pvueecey0w4dqwfSkhsTvoCkAAkKmV40/odfZp8re6z1uROnij7ElIgROcoIACb9rhIJ7lyv/YhBApQRknuGF7cmfYw6mFBTx58gTrZR+QERJ5WKQDy0Nm2rNUZutlX4byBJ1hHzd++BEfnT2Lx8fH2LA97AT7aRRS6AoOcnSlPzmtgKNDBbBu+7Id7KPRasEsFvk8z/NQLbswpMDuoEdfUt+JdtLP5H1OpUYFoZfjXOItBD2EoHqj2+2qYygrIeB7Lqolh7/U5iBmZTg/X2IE1m1P/nz/Nr5tfI+iaaUTlJKRWCt7IILuDjLlyENEZoCPfuY85nCp/u3BPhqNJkzThKAQIsAZCV2OkosOo5C95pGqXpNYGsNJAewGXbSaDZiWCUkZ6LdUCvrpez6qtgMpJTqDfrw3X/35TpGVYpwJGc/OkAJo8gcs01S2QRLV3KHFrg6C7hUfJpJ/KhGEFk6cxZrtyF//vIevrl9mplqmpQ8gP6Q4BKSQHI/ne6iWXNAbhUQ2r3kKlBYTq0AKAZZhs8XwW2aRS0HRUlCMiAbE95Uy2nEA8zI/SYCIafrUyAUb9TqEYbAMLcvUJwu9ilAQcEmaZRf0tB1oFCaUfS4jokXrZU+GCNEJDtBoNrVFC5hWUZdAe44mpUd8IH8QEp0oiBnlyCNsCrtq2ZG3gtsM+Ha9jkJBIWFaFsPPFdDEVEiQPziKDxTEZPLn1mi0QW9cs1129b1Bj12wvr0NUSgw1GYxUY6IvpLkSXbtcHQjZUwBPu0D44FRSw4l2W4XC88V8N32turlEijGnFC2LoTiw9KrNqzF17hG7eBAszUZBOWqFJVV7uh3Yn2VBhIR4lbQ4031RgMGyUFAO6UaL7iTs0l5bFKqK0Y9Y5oy0i0qV7gUBH2gM+zywfVGHYagIYWCUN2SpEt9QilVYvHUC3BffxsSJ3NJlFPKgyayiartSoGQsyVesEdo3xE8tAnUapvo9br44L33cRz+z62bJCoRJsoxDn2yk880s6rtcLvuBH00W00mQG2zxplT+6YyvPzFAEuXt5i8hAaVxEABO4numWbFaJTIL1a8Wt2QQmjh73/dw9+PH2K1tMLTEx1z59xVLH+zhZ9qF/Hmi6fhX/sU//z3CGslVxMz3TciBszVVpPwrJWpJAZOZBhPuXvDA76/sXkRbyyeBllHGAp8/tvXuHTYQsVe4SD2ggOR1UFOABEYs9qpel9hjlBTOsCd81djJOmtUQDuPzzCh83PsGo7KHCvSSBBDORjntG9svWiIAzWfx93P7kWz33kEQSUMCSWrnyMd8238MrzL7E6ok8qBNKTeeL8aQpJh1Hh0oCmJdw9R0GoS801IYQwsHxlCxXbYeJyA4sGHo4hmqzjm1QcyvUyM+3ISpS/cRAS2Bv2cHj+us5NVf3Bv0e49EcTN4e/4B1rGbt6zI85MF8VdOvgxVlTVVBW7BVGYm/QxyGVQ4v9waMjnGleQKXs6BFf/duaQsJ8Zc7QK5+4WnKlweXo42btyxi5M60LqJB0E0OMDiA//4gg4y0kG8b4/krZUUgEfbZrck2VvaH/8Gpxj22dRMjEwtSeKbUjz4hmiIIwuBpR7ZNin/2Pc5yPk+szD5kSa54CLpxORed+rQMAAAAASUVORK5CYII=',
      options: {
        customCursorOnClick: true
      }
    },
    // {
    //   template_id: '474969',
    //   disabled: false,
    //   public: true,
    //   name: 'Upgraded Butter Knife Cursor',
    //   type: 'dust',
    //   customCursor: true,
    //   class: 'cursor-knife',
    //   image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAABSZJREFUWEeVV01vG1UUPW9MyoIAQlB5BiE8XiAlEhJImQ+EUOwkQl3FdBXUsmRJ/wkrJLquEK1QWyD+WECLEjuVEIrtVCCUFqmLsasuQFlAVRZNIfOqe9+b8cx4/NFZjWfee3Pvueecey0w4dqwfSkhsTvoCkAAkKmV40/odfZp8re6z1uROnij7ElIgROcoIACb9rhIJ7lyv/YhBApQRknuGF7cmfYw6mFBTx58gTrZR+QERJ5WKQDy0Nm2rNUZutlX4byBJ1hHzd++BEfnT2Lx8fH2LA97AT7aRRS6AoOcnSlPzmtgKNDBbBu+7Id7KPRasEsFvk8z/NQLbswpMDuoEdfUt+JdtLP5H1OpUYFoZfjXOItBD2EoHqj2+2qYygrIeB7Lqolh7/U5iBmZTg/X2IE1m1P/nz/Nr5tfI+iaaUTlJKRWCt7IILuDjLlyENEZoCPfuY85nCp/u3BPhqNJkzThKAQIsAZCV2OkosOo5C95pGqXpNYGsNJAewGXbSaDZiWCUkZ6LdUCvrpez6qtgMpJTqDfrw3X/35TpGVYpwJGc/OkAJo8gcs01S2QRLV3KHFrg6C7hUfJpJ/KhGEFk6cxZrtyF//vIevrl9mplqmpQ8gP6Q4BKSQHI/ne6iWXNAbhUQ2r3kKlBYTq0AKAZZhs8XwW2aRS0HRUlCMiAbE95Uy2nEA8zI/SYCIafrUyAUb9TqEYbAMLcvUJwu9ilAQcEmaZRf0tB1oFCaUfS4jokXrZU+GCNEJDtBoNrVFC5hWUZdAe44mpUd8IH8QEp0oiBnlyCNsCrtq2ZG3gtsM+Ha9jkJBIWFaFsPPFdDEVEiQPziKDxTEZPLn1mi0QW9cs1129b1Bj12wvr0NUSgw1GYxUY6IvpLkSXbtcHQjZUwBPu0D44FRSw4l2W4XC88V8N32turlEijGnFC2LoTiw9KrNqzF17hG7eBAszUZBOWqFJVV7uh3Yn2VBhIR4lbQ4031RgMGyUFAO6UaL7iTs0l5bFKqK0Y9Y5oy0i0qV7gUBH2gM+zywfVGHYagIYWCUN2SpEt9QilVYvHUC3BffxsSJ3NJlFPKgyayiartSoGQsyVesEdo3xE8tAnUapvo9br44L33cRz+z62bJCoRJsoxDn2yk880s6rtcLvuBH00W00mQG2zxplT+6YyvPzFAEuXt5i8hAaVxEABO4numWbFaJTIL1a8Wt2QQmjh73/dw9+PH2K1tMLTEx1z59xVLH+zhZ9qF/Hmi6fhX/sU//z3CGslVxMz3TciBszVVpPwrJWpJAZOZBhPuXvDA76/sXkRbyyeBllHGAp8/tvXuHTYQsVe4SD2ggOR1UFOABEYs9qpel9hjlBTOsCd81djJOmtUQDuPzzCh83PsGo7KHCvSSBBDORjntG9svWiIAzWfx93P7kWz33kEQSUMCSWrnyMd8238MrzL7E6ok8qBNKTeeL8aQpJh1Hh0oCmJdw9R0GoS801IYQwsHxlCxXbYeJyA4sGHo4hmqzjm1QcyvUyM+3ISpS/cRAS2Bv2cHj+us5NVf3Bv0e49EcTN4e/4B1rGbt6zI85MF8VdOvgxVlTVVBW7BVGYm/QxyGVQ4v9waMjnGleQKXs6BFf/duaQsJ8Zc7QK5+4WnKlweXo42btyxi5M60LqJB0E0OMDiA//4gg4y0kG8b4/krZUUgEfbZrck2VvaH/8Gpxj22dRMjEwtSeKbUjz4hmiIIwuBpR7ZNin/2Pc5yPk+szD5kSa54CLpxORed+rQMAAAAASUVORK5CYII=',
    //   options: {
    //     fullWords: true,
    //     dustColors: ['#4056FF', '#ffe040', '#ff0000'],
    //     charList: ['Quack!', 'Stab', 'Stabby', 'Duck!', '@#$%?&*'],
    //     randomColors: false,
    //     fontStyle: '30px DayDream',
    //     distance: 100,
    //     gravity: 0.02
    //   }
    // },
    {
      template_id: '474969',
      disabled: false,
      public: false,
      name: 'Upgraded Butter Knife Cursor',
      type: 'trail',
      customCursor: true,
      class: 'cursor-knife',
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAABSZJREFUWEeVV01vG1UUPW9MyoIAQlB5BiE8XiAlEhJImQ+EUOwkQl3FdBXUsmRJ/wkrJLquEK1QWyD+WECLEjuVEIrtVCCUFqmLsasuQFlAVRZNIfOqe9+b8cx4/NFZjWfee3Pvueecey0w4dqwfSkhsTvoCkAAkKmV40/odfZp8re6z1uROnij7ElIgROcoIACb9rhIJ7lyv/YhBApQRknuGF7cmfYw6mFBTx58gTrZR+QERJ5WKQDy0Nm2rNUZutlX4byBJ1hHzd++BEfnT2Lx8fH2LA97AT7aRRS6AoOcnSlPzmtgKNDBbBu+7Id7KPRasEsFvk8z/NQLbswpMDuoEdfUt+JdtLP5H1OpUYFoZfjXOItBD2EoHqj2+2qYygrIeB7Lqolh7/U5iBmZTg/X2IE1m1P/nz/Nr5tfI+iaaUTlJKRWCt7IILuDjLlyENEZoCPfuY85nCp/u3BPhqNJkzThKAQIsAZCV2OkosOo5C95pGqXpNYGsNJAewGXbSaDZiWCUkZ6LdUCvrpez6qtgMpJTqDfrw3X/35TpGVYpwJGc/OkAJo8gcs01S2QRLV3KHFrg6C7hUfJpJ/KhGEFk6cxZrtyF//vIevrl9mplqmpQ8gP6Q4BKSQHI/ne6iWXNAbhUQ2r3kKlBYTq0AKAZZhs8XwW2aRS0HRUlCMiAbE95Uy2nEA8zI/SYCIafrUyAUb9TqEYbAMLcvUJwu9ilAQcEmaZRf0tB1oFCaUfS4jokXrZU+GCNEJDtBoNrVFC5hWUZdAe44mpUd8IH8QEp0oiBnlyCNsCrtq2ZG3gtsM+Ha9jkJBIWFaFsPPFdDEVEiQPziKDxTEZPLn1mi0QW9cs1129b1Bj12wvr0NUSgw1GYxUY6IvpLkSXbtcHQjZUwBPu0D44FRSw4l2W4XC88V8N32turlEijGnFC2LoTiw9KrNqzF17hG7eBAszUZBOWqFJVV7uh3Yn2VBhIR4lbQ4031RgMGyUFAO6UaL7iTs0l5bFKqK0Y9Y5oy0i0qV7gUBH2gM+zywfVGHYagIYWCUN2SpEt9QilVYvHUC3BffxsSJ3NJlFPKgyayiartSoGQsyVesEdo3xE8tAnUapvo9br44L33cRz+z62bJCoRJsoxDn2yk880s6rtcLvuBH00W00mQG2zxplT+6YyvPzFAEuXt5i8hAaVxEABO4numWbFaJTIL1a8Wt2QQmjh73/dw9+PH2K1tMLTEx1z59xVLH+zhZ9qF/Hmi6fhX/sU//z3CGslVxMz3TciBszVVpPwrJWpJAZOZBhPuXvDA76/sXkRbyyeBllHGAp8/tvXuHTYQsVe4SD2ggOR1UFOABEYs9qpel9hjlBTOsCd81djJOmtUQDuPzzCh83PsGo7KHCvSSBBDORjntG9svWiIAzWfx93P7kWz33kEQSUMCSWrnyMd8238MrzL7E6ok8qBNKTeeL8aQpJh1Hh0oCmJdw9R0GoS801IYQwsHxlCxXbYeJyA4sGHo4hmqzjm1QcyvUyM+3ISpS/cRAS2Bv2cHj+us5NVf3Bv0e49EcTN4e/4B1rGbt6zI85MF8VdOvgxVlTVVBW7BVGYm/QxyGVQ4v9waMjnGleQKXs6BFf/duaQsJ8Zc7QK5+4WnKlweXo42btyxi5M60LqJB0E0OMDiA//4gg4y0kG8b4/krZUUgEfbZrck2VvaH/8Gpxj22dRMjEwtSeKbUjz4hmiIIwuBpR7ZNin/2Pc5yPk+szD5kSa54CLpxORed+rQMAAAAASUVORK5CYII=',
      options: {
        trailColor: '#ff0000',
        trailSize: 3,
        customCursorOnClick: true
      }
    },
    {
      template_id: '479635',
      disabled: false,
      public: false,
      name: 'PXSS Newton Cursor',
      type: 'base',
      customCursor: true,
      class: 'cursor-pixverse',
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAA1RJREFUWIW9l71rU1EYxn8RHWv/gC5eRIpL1QuJZEjTpJObqbg4dnMpKOIQvCJJyOSii4ilSIcutT3FxSlfzRB6g8fqoIhI0qHgGjt2iEN6Dud+JamavkvCzb33+b3Pec57c2OcVNZK9NX3aseNcUYV84uH1SSBzpniz9ZfhJ40CvCfANSXaselUa/xbP0FlYJLZvk2lYI7cYiYb+0pFssApBcypLpJABafJjwX/c8l0Q6Y3QI06jWal1qUuuXAb1kr0Q9zRB0/jVsa4J1IkMvlcJw8AI6Tp1GvkV7IaMBhIH7RcSE0wN7PI+7FDtlcSuA4eYrFsoZQTigQf1hNsdPmRgPI31Ps/TwC0E6oPMynkqQXMpS6ZZqXWqTmrEFY9997YCoFl1K3zPT1GX18FERgDtgXj7h5eQqAu9uDborFMlK2se24vvDJyjLNLx1Sc9bgs5uk1B2c9+DhYxr1GrW1HX1+VHD1QQVR7bg8unaVm5en2OjPYNtxj7jKhJmP1JxF6eWaR1zKNttLQu+gKABzDig3eP75m85ElPjx+kca9RoAzS+dUHGVG7/LoQBmmRD+UqKFH1s6pADbb18FxKVsU+24gXuYFbDFP5hyuRwAth3HcfI8vXKHwo8tAB1SIHQ5hBBkrTGXwBCNnHLFYjkgruaGuRxPVpZ58PBxZNdDAczKWgmEEABI2fYIS9n2bFU/RGrOYrfZMu81fgZMF5SFQggPhBCC3WZLOxAFEfWEVTX0oWJuzc2lBBv9GQC9Kxwnz26zxXwq6VkSNTdU9fYPA42pilwC0zIlLoTQcwEGTsynktpqU1xKiZRyaPcA50edcP8GWlzdXOXCtuMaQgEp8YODA/q9X3CcZjE+HXn/oSEEePWJgPjm0iAXYcH0iPsqLIhjZSCzfNsjrhyBwYNLZWJ19XVQ/DgNH75HjuSRDgDU1nbo7R96xLNWQm9TM3CBzi804NZsoKmxHAi7IKzMibn95qtXHAIunFwTGwsgCqTacWPD4CoFd9C5D4JbszqU1Y4b++c/l0Mh2j3vgRMXKu0ei/Hp/wMwCqrS7unOTQhVY4Xwb0t1qgUNEPXfcWKvXH4XFuPT+tOsib6ERuXDzMBEl8A/dFQoTRfO7DU8bBsD/AEwajH+rqbZQwAAAABJRU5ErkJggg==',
      options: {
        customCursorOnClick: true
      }
    },
    {
      template_id: '485864',
      disabled: false,
      public: false,
      name: 'Upgraded PXSS Newton Cursor',
      type: 'projectile',
      customCursor: true,
      class: 'cursor-pixverse-upgrade',
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAA0tJREFUWIW9l79LHEEYhp+L9kIsrggWW9gFCQcKB66e3j+QQ7BJJ1hG0CKBIyviHgc2AZMiRSAEIU1AR9Lv/XADgkeGkJQWi4RALAxYx8QUm5nMzu3emZjL1+yy7Mz7zPe9881ujl8x70xdqvtGdJTjP0XOFk+LQQLdMMU3drZTX+oHeC0AddOIjmi3mmzsbBNEeeaW7hJE+YFD5Kza4/t1AGZLc7hufF92ThOD/mVJhtVNEOUxZ223mhBWabeaBN5hAkJB2yB/Y2RdgubNISqVCp5XBcDzYvHZ0pwGNEuiBJWoXaKrlkwDtEaHuN++pHHzLp5XxffrGiIMq9T8ogaxzWqK/alvNMDbi0+0RocAdCaUH2bcIrOlOWp+kTCs4k44sVnfv0nABFGeml9k5M4t/bwfRFcfmB4eo3T2PR78dR8A368jZYdCYVIPfLSyRPghwp1w4qtbp+YXkbLD6toD2q0mzRf7+v0sT+iHhrFYH1+gdPadp7M5CoXJhLjyhOkPd8Kh9uRFQlzKDnviQps3C8DsAyobbB7vak9kiX/beRfvFCD8EKWKK9/YWU4FMMOEsEOJbh7vapMC7L181iUuZYdGdJQmoaMrLXZjqlQqABQKk3helfXxBTaPdwG0SYHUcgghmHem1Fy9S2CIZjYQ3693iau+YZbj0coSq2sPMlfdE8CMeWcKIQQAUnYSwlJ2ElvVhnAnHA7CQ3Ouq3vAzIJKoRAiASGE4CA81BnIgsg6YVX07Nf21vx4+weA3hWeV+UgPGTGLSZKovqGivP3n7sWpiKzBGbKlLgQQvcFiDMx4xZ1qk1xKSVSyp6rB+M0zIrp4TEtriZXvigUJjWEAlLiJycnXJ5/gZFlyk72/D1NCPEZYYuvjy8A6cZMiFuRZsRMALNetrjKiG3MLPFgcS1zgX1LAOhDxRQ3dwf8NmbXys+fw8gy/CrDvDN1aS6u71fLVc50s2PuiYukOMQAD+9Rfv3YHJO7EkAWSCM6yvWCCxbXYOtVFwRbrxIn5LU/LntCWJ9wKgtBlKfsnP4bgH5QQZTXKzchVPTdhtcJtVItaIConTGwXy47C2XnVF/NGOhPaJY/TA8MtAT24aNMaWbhv/2Gp21jgJ8xICrnbc26yAAAAABJRU5ErkJggg==',
      options: {
        customCursorOnClick: true,
        activateOnClick: true,
        projectileHold: true,
        projectileDelay: 80,
        projectileType: 'image',
        projectileSpeed: 20,
        projectilePosition: -29,
        images: [
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAWFJREFUWIXtl8FtwzAMRckskGHqAbqAJ+g5MwToAAUyQ88BcvcCHcDdo9dMwB4ERdQ3mUi2lF76AQOSLIjP/CKRMIGExhc9Z5q+cU9LsRd4ubEPCBvBZ9gz9ITYwTwFP74t1h5laY1YHTpD4KDTOY66ZCLPAAbP17pkAi0Ien8Nj4YIIM0hfAs0wMdXGgdLmtmxUwcM2RsdFLPRMBNowaAunQ8RhOW6Sl4jmrMLadkB1bHWCtaTv4DILIADHtthlGit2Fo0W7NXHRqSaKjNggnwTAi7EZFhB1EKhHbkHbTKDhdgC0RNb3AtQBV3TFUZJVYUA/SCqAIwISKIDdEeAEB8iP0hju5CrAZQILIFYjPAVoi7ZVgqpil9yOmcl+j1M47M/tAEoBSix49aU0KjCI0ix4vI9Sc9YR3++HSEuE2SDUT7Q5atZhagmCa+BUoXcQHXLQNewAj3jLgLCAT5FxHRLyL0wg/wMzD7AAAAAElFTkSuQmCC'
        ]
      }
    },
    {
      template_id: '485869',
      disabled: false,
      public: false,
      name: 'Pit Lamp Cursor',
      type: 'base',
      customCursor: true,
      class: 'cursor-wombat',
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAnlJREFUWIW1lzFo21AQhn+VbgGPLR46aA0dSge5QwhB7tCpq+sle5dWYEMgQygZAgELRJfuWUyGLJ46NBpChlpDoVC6auhgmqFbZndw7+V07570lNoHD2Pp3vu/d+/uJAUAEIfREh6Wl0Xg49fGAi5+eVxYDv2jaKMgBuDyuFDFOBS/vy6Ih00OXJRDxmG0XAeECkALy9zoH0UWhDavjT3QLtLCeVkENCSEa55vQhsAWlwu7FooTwYI/qQAgEflqRnaBnzMCrUrGUkcAOLs3BIluwkP7vw9jsQ4NEFo4lyMfN68f94KonLT1RMo5Fz8+8XeiM/tjntpngyMjy9EpQrysjB9oRKBpF5cMwnhMqsKZNbzXfmKS+G6pFTLkEAAfec/X/5O+a+0xWQ+ugkPKonqgnACkFEo+a62vzx2RiFPBuiOeymwioSrWrwBNKOdv3g3RWeWpZ1Zlt7uDhFn58ZnMZlbkFoUvAEWk/moO+6ltDsA+PpxiLevfpmhzWk6ikYAWoDKLE8G6D97DQ7SBF4H0eoIKMQc5OzwGnj6YTWYdWaZBajlQ2OrJFqrufzrjByMrvP/LqMq8wbgEJQPEsTHTBR9ATgEfwZQlksQn91zAK8cIGd+BCS8mMxHsgT3T3bMuN0dguC1RGzdB3yaC0/Iraup0z8Oo6U3AH8+8NIkEUq+/ZMd4McK4OzwWhWnKgI8XkolhGwksh98+vwEW1dTANWyo+OTuXKvt1pZmrR7Xh1SXCvbvCyCVhGQdpcP3wCsoiFDXicO3DMCgF2aGhygNyyeT//1YaE93fixSGEpvhEAoKZNK++Ga/3ajcNo2UZ8IwDa9bq34r82wKQYwYBVJAAAAABJRU5ErkJggg==',
      options: {
        customCursorOnClick: true
      }
    }
  ],
  // ------------------------------------------------------------ Themes
  themeStyles: [
    {
      template_id: '0000011',
      name: 'Official theme 1',
      gradients: false,
      darkMode: false,
      public: true,
      colors: {
        primary: '#29adff',
        tertiary: '#3171d8',
        secondary: '#7e2753',
        light: '#FFF1E8',
        accent: '#29adff',
        toolbars: '#ff004d',
        grey: '#c2c3c7'
      }
    },
    {
      template_id: '0000012',
      name: 'Official theme dark',
      gradients: false,
      darkMode: true,
      public: true,
      colors: {
        primary: '#7e2753',
        tertiary: '#7e2753',
        secondary: '#7e2753',
        light: '#7e2753',
        accent: '#ff004d',
        toolbars: '#29adff',
        grey: '#c2c3c7'
      }
    },
    {
      template_id: '363831',
      name: 'Golden theme',
      gradients: true,
      darkMode: false,
      public: false,
      colors: {
        primary: '#3171d8',
        tertiary: '#3171d8',
        secondary: '#742f29',
        light: '#fff5ce',
        accent: '#ffa300',
        toolbars: '#ab5236',
        grey: '#c2c3c7'
      }
    },
    {
      template_id: '376005',
      name: 'Bluescreen theme',
      gradients: false,
      darkMode: true,
      disabled: false,
      public: false,
      colors: {
        primary: '#0000AA',
        tertiary: '#0000AA',
        secondary: '#0000AA',
        light: '#0000AA',
        accent: '#ffec27',
        toolbars: '#0000AA',
        grey: '#c2c3c7'
      }
    },
    {
      template_id: '403870',
      name: 'Christmas theme',
      gradients: false,
      darkMode: false,
      disabled: false,
      public: false,
      colors: {
        primary: '#F22929',
        tertiary: '#3F8C4B',
        secondary: '#7a000a',
        light: '#F2E5BD',
        accent: '#3F8C4B',
        toolbars: '#F22929',
        grey: '#c2c3c7'
      }
    },
    {
      template_id: '444228',
      name: 'cryptomonKeys theme',
      gradients: false,
      darkMode: false,
      disabled: false,
      public: false,
      colors: {
        primary: '#1abe3e',
        tertiary: '#fcdd11',
        secondary: '#1abe3e',
        light: '#ffffcc',
        accent: '#a85d12',
        toolbars: '#fcdd11',
        grey: '#c2c3c7'
      }
    },
    {
      template_id: '453575',
      name: 'Cat Stickers theme',
      gradients: false,
      darkMode: false,
      disabled: false,
      public: false,
      colors: {
        primary: '#BFDBFE',
        tertiary: '#BFDBFE',
        secondary: '#fca5a5',
        light: '#FFF1E8',
        accent: '#ffd892',
        toolbars: '#afd2ff',
        grey: '#c2c3c7'
      }
    },
    {
      template_id: '473471',
      name: 'Digital Ducks theme',
      gradients: false,
      darkMode: false,
      darkBar: true,
      disabled: false,
      public: false,
      colors: {
        primary: '#FFE040',
        tertiary: '#000',
        secondary: '#4056FF',
        light: '#fff',
        accent: '#FFE040',
        toolbars: '#4056FF',
        grey: '#c2c3c7'
      }
    },
    {
      template_id: '479621',
      name: 'Pixverse theme',
      gradients: false,
      darkMode: true,
      darkBar: true,
      disabled: false,
      public: false,
      colors: {
        primary: '#000',
        tertiary: '#000',
        secondary: '#1d2b53',
        light: '#0b1323',
        accent: '#59e8ff',
        toolbars: '#1d2b53',
        grey: '#c2c3c7'
      }
    },
    {
      template_id: '485874',
      name: 'Wombat Dungeon Master theme',
      gradients: false,
      darkMode: true,
      darkBar: true,
      disabled: false,
      public: false,
      colors: {
        primary: '#3f126b',
        tertiary: '#000',
        secondary: '#8102e9',
        light: '#3f126b',
        accent: '#ffbb2d',
        toolbars: '#5300ab',
        grey: '#c2c3c7'
      }
    }
  ],
  // ------------------------------------------------------------ Wallpapers
  wallpaperStyles: [
    {
      template_id: '1000001',
      name: 'Cloudy Day',
      type: 'wallpaper',
      extension: '.png',
      defaultDisplayStyle: 'centered-background',
      defaultSize: '60%',
      bgColor: '#dfeaff',
      public: true,
      disabled: false
    },
    {
      template_id: '1000002',
      name: 'At the aquarium',
      type: 'wallpaper',
      extension: '.png',
      defaultDisplayStyle: 'covering-background',
      defaultSize: '60%',
      bgColor: '#6fd7e2',
      public: true,
      disabled: false
    },
    {
      template_id: '376019',
      name: 'Glitched Pop-ups',
      type: 'wallpaper',
      extension: '.png',
      defaultDisplayStyle: 'covering-background',
      defaultSize: '60%',
      bgColor: '#0000AA',
      public: false,
      disabled: false
    },
    {
      template_id: '396462',
      name: 'Warm fire',
      type: 'wallpaper',
      extension: '.png',
      defaultDisplayStyle: 'covering-background',
      defaultSize: '60%',
      bgColor: '#3F8C4B',
      public: false,
      disabled: false
    },
    {
      template_id: '444231',
      name: 'cryptomonKeys Wallpaper',
      type: 'wallpaper',
      extension: '.png',
      defaultDisplayStyle: 'centered-background',
      defaultSize: '40%',
      bgColor: '#1b6c3b',
      public: false,
      disabled: false,
      texture: true,
      textureExtension: '.png'
    },
    {
      template_id: '445291',
      name: 'After Hours Gambler Wallpaper',
      type: 'wallpaper',
      extension: '.png',
      defaultDisplayStyle: 'mosaic-background',
      defaultSize: '80%',
      bgColor: '#00360c',
      public: false,
      disabled: false,
      texture: false
    },
    {
      template_id: '453588',
      name: 'Cat Stickers Wallpaper',
      type: 'wallpaper',
      extension: '.png',
      defaultDisplayStyle: 'centered-background',
      defaultSize: '40%',
      bgColor: '#BFDBFE',
      public: false,
      disabled: false,
      texture: true,
      textureSize: '40%',
      textureExtension: '.png'
    },
    {
      template_id: '457146',
      name: 'Golden Wallpaper',
      type: 'wallpaper',
      extension: '.svg',
      defaultDisplayStyle: 'centered-background',
      defaultSize: '40%',
      mosaicSize: '50%',
      bgGradient: true,
      customGradient: 'linear-gradient(70deg, rgba(188,102,53,1) 10%, rgba(241,163,49,1) 28%, rgba(255,254,181,1) 33%, rgba(255,255,255,1) 34%, rgba(255,254,181,1) 35%, rgba(241,163,49,1) 40%, rgba(255,205,92,1) 48%, rgba(234,155,50,1) 57%, rgba(197,112,53,1) 67%, rgba(241,163,49,1) 85%, rgba(188,102,53,1) 100%)',
      animatedGradient: true,
      bgColor: '#ffa300',
      public: false,
      disabled: false,
      texture: false
    },
    {
      template_id: '473470',
      name: 'Digital Ducks Wallpaper',
      type: 'wallpaper',
      extension: '.png',
      defaultDisplayStyle: 'centered-background',
      defaultSize: '50%',
      mosaicSize: '15%',
      bgColor: '#FFE040',
      public: false,
      disabled: false,
      texture: false
    },
    {
      template_id: '479614',
      name: 'Pixverse Wallpaper',
      type: 'wallpaper',
      extension: '.png',
      defaultDisplayStyle: 'centered-background',
      defaultSize: '50%',
      mosaicSize: '33%',
      bgColor: '#000',
      public: false,
      disabled: false,
      texture: true,
      textureSize: '200%',
      textureExtension: '.gif',
      textureOpacity: 1
    },
    {
      template_id: '485872',
      name: 'Wombat Dungeon Master Wallpaper',
      type: 'wallpaper',
      extension: '.jpg',
      defaultDisplayStyle: 'covering-background',
      defaultSize: '50%',
      mosaicSize: '33%',
      bgColor: '#000',
      public: false,
      disabled: false
    }
  ]
}

const getters = {}

const actions = {
  // async fetchFavoris ({ commit, dispatch }) {
  //   try {
  //     await apolloClientV2.query({
  //       query: require('@/graphql/queries/v2/searchCommunFavoris.gql'),
  //       // variables: { filtre: { types: ['BOUTIQUE_ITEM'] } },
  //       fetchPolicy: 'network-only'
  //     }).then(({ data }) => {
  //       commit('initFavoris', data.searchCommunFavoris.resultat)
  //       commit('setFavTotal', data.searchCommunFavoris.total)
  //       dispatch('fetchMoreFav', 1)
  //     })
  //   } catch (e) {
  //     console.error('erreur lors de la récupération des favoris')
  //   }
  // },
}

const mutations = {
  setActiveWallpaper (state, payload) {
    state.activeWallpaper = payload
  },
  setActiveCursor (state, payload) {
    state.activeCursor = payload
  },
  setActiveTheme (state, payload) {
    state.activeTheme = payload
  },
  setActiveWallpaperDisplayStyle (state, payload) {
    state.activeWallpaperDisplayStyle = payload
  },
  setWallpaperSize (state, payload) {
    state.wallpaperSize = payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
