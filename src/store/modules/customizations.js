// import VueCookies from 'vue-cookies'
const state = {
  userCustomizations: [],
  activeWallpaper: null,
  activeCursor: null,
  activeTheme: null,
  activeWallpaperDisplayStyle: null,
  wallpaperSize: '60%',
  cursorStyles: [
    // {
    //   // cursorImage
    //   template_id: '12344',
    //   name: 'Ghost',
    //   rarity: '',
    //   type: 'ghost',
    //   options: {
    //     image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAASNJREFUWIW9l10OgyAMxwfZYeYd5uM8tD7qHfQ27mWQiqX0izUxMWLpjz8FSnhU7PN6n7W25dhCrU1qt46owD1gLs5Y8Hlf8/s0jO4gVQAYGDMMRgORHSTBKRAphBnAChLLD5rgmB83maPk5x4QNwX+DXEB0MpvgXBXQAoRveafA4ECWAJQOyPXMoBm/ud9NUM8Td4/SxDUuVHbmELKAUqBaRib7ZRRu2K3VcAJLgKgRlmqsxxbSE+r3y4KSJZ2BuBks0QF9mEEZbIuKQ1EwH5slWGe1RIKwDENBAbSLEqhI6WUBARCxFoD9l1TdGKQcCDiDjUqJINqpMGoanlPCNVGVE6FZfmarlWtm1Rp2AlpvmRqKypTDlgh4BS6XbO5EGX+fAFinL3TpLmq4gAAAABJRU5ErkJggg==',
    //     decay: 20,
    //     fade: true
    //   }
    // },
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
        colors: ['#ffec27', '#ffa300', '#fff'],
        chars: ['+', '+', '+'],
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
        colors: ['#422136', '#000'],
        chars: ['!', '@', '#', '$', '%', '?', '&', '&'],
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
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAgVJREFUWIW9V71uwjAQ/hzRrqxUYmED9pYlVQdItnbiUboxs/EGvAIsjGkZqrKk7FUfAAlQp6hjB3cAR2fHhnOAflNyvvi++7UjQBA1QwkAyWBBxYiHIV6+FgIXQKAMK+MuHFs3dbn6gc/GvuAQqdCXJJ3sHmY12OSiqst9iLhSKPK8K+MHIKo1Vh3IbCMBIO70NbmNRMDZsCySdKI5ZkuJoIuUYWsqNcX64B7J4lsz0L2tFozOlxlw9VaQu6KRdwHDoZNgpljZvGgKOCS0LlDFAwDtV8vHvw+abL7MnMY4BQgAQuLRGv72dKa9f/a2BQJO7GuAQ8JJANmYZ+wIKImzt6HpYRlUXAvm0JHZRhYn5AZxp88aYhRRM5Sr4fthAj5QkaBEuEV4MoEkneTGXCk5dJTnNdBtbNFtbE/l42UccEUgG0MCWnfEnT6SgX0TGgWOUYoAwNk99xntZxvFrllvg+oAYH8aUmVbS9HwHms5TvXTk7ZAwDRiq2xfEiaR1lTKm+eOmwAHZUgoIpRAoISuyrXJfSafubfpbMVUpgrqQ1MOWO6Hqzs9iuo4rx8mWJgDnB4ucwiZs0KB3Ybn+DOiqVuPUqxHqd8cuMTvWakNo2YozUIUP0925fqHAHbHuW1GlPaI3h+V8ah3XdBTUTOLWMlLE1BRoJ7bCNhAU/nvVzKzjv4A1McWXZcxVBgAAAAASUVORK5CYII=',
        decay: 100,
        fade: true
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
        particleType: 'image'
      }
    },
    {
      template_id: '000001010101',
      disabled: true,
      public: false,
      name: 'Lost Mitten Cursor',
      rarity: '',
      type: 'dust',
      customCursor: true,
      class: 'cursor-mitten',
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAXtJREFUWIW1l7FxwzAMRb+4gErX3sCVB4h6b6GpsoV7eQBX3kB1ykyQFDnoQBgACZL5jXnU0f/xE6SoCY4+ztcfrf+xPydvXETqH1nG/wHzNliab/spe76cv4ZCZAO5uTSWkiCtEMegiLkF0gIx9ZiPgEhV5t+f+a8QHxcpYABIrjkZzutfe15NkJbkMgBVZCyhCMRQJAUbQM5emhdSqIWwAciYg5Cxk0J0KfwE5vV9xtRnFCRXTQp+AhyE+mQiiiIpHADaEatGXTl7giilkNyDQ6ZQMXtNHsSQk9BT6ZRM8oG6FIOkJaG+jIBBSbBaWS63o80nnKQ5GXcnIQp1e92PNvfLtiGZd0Mou2S53DIIFUCDCUMY5pYyAGm27adYLTjm2+uugnTfiFrMeRGad8IQSKM5IJag6WLZYQ5Ufhe4SQiAiLkJoEFY4lsrag442/CxP6eWJYmYA04CJWW7RkmhxhwoXUorRaZRc6AjAZJWK5GlG/KZzSGidfMLX+H40lpcAWoAAAAASUVORK5CYII=',
      options: {
        colors: ['#fff'],
        chars: ['•', '*'],
        randomColors: false,
        randomChars: false,
        fontStyle: '20px DayDream',
        distance: 80,
        gravity: 0.01
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
        accent: '#29adff',
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
    }
  ],
  // ------------------------------------------------------------ Wallpapers
  wallpaperStyles: [
    {
      template_id: '1000001',
      name: 'Cloudy Day',
      type: 'wallpaper',
      extension: '.png',
      defaultDisplayStyle: 'centered',
      defaultSize: '50%',
      bgColor: '#dfeaff',
      public: true,
      disabled: false
    },
    {
      template_id: '1000002',
      name: 'At the aquarium',
      type: 'wallpaper',
      extension: '.png',
      defaultDisplayStyle: 'covered',
      defaultSize: '50%',
      bgColor: '#EAAF08',
      public: true,
      disabled: false
    },
    {
      template_id: '376019',
      name: 'Glitched Pop-ups',
      type: 'wallpaper',
      extension: '.png',
      defaultDisplayStyle: 'covered',
      defaultSize: '50%',
      bgColor: '#ffffff',
      public: false,
      disabled: false
    },
    {
      template_id: '396462',
      name: 'Warm fire',
      type: 'wallpaper',
      extension: '.png',
      defaultDisplayStyle: 'covered',
      defaultSize: '50%',
      bgColor: '#3F8C4B',
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
