import {AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

import {environment} from '@environment';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {PagesService} from '@subscribes-services';

@Component({
  selector: 'app-page-card',
  templateUrl: './page-card.component.html',
  styleUrls: ['./page-card.component.scss']
})
export class PageCardComponent implements OnInit, AfterViewInit {
  @ViewChild('card', {static: false}) card: ElementRef;
  @ViewChild('picture', {static: false}) picture: ElementRef;
  @Input() page: any;
  fullMode = false;
  isVisibleMenu = false;
  baseUrl = environment.apiUrl;
  background = '';
  switchActive = false;
  link = 'https://scontent-arn2-1.cdninstagram.com/v/t51.2885-19/s150x150/78712384_2493008157420466_4620789072762241024_n.jpg?_nc_ht=scontent-arn2-1.cdninstagram.com&_nc_ohc=AXyO3tvjujkAX-0acUZ&tn=1mLkkDV3dL54Edfp&edm=ABfd0MgBAAAA&ccb=7-4&oh=18befb7e67c16f940466b50b34c137e4&oe=615B73A6&_nc_sid=7bff83'
  // avatar = "/9j/4AAQSkZJRgABAQAAAQABAAD/7QCEUGhvdG9zaG9wIDMuMAA4QklNBAQA\nAAAAAGgcAigAYkZCTUQwYTAwMGE2ZjAxMDAwMDQ4MDMwMDAwZDEwNTAwMDA5\nYTA2MDAwMDQ5MDcwMDAwNzQwODAwMDAwZjBiMDAwMDg5MGIwMDAwNGYwYzAw\nMDAwYTBkMDAwMDc1MTEwMDAwAP/bAEMABgQFBgUEBgYFBgcHBggKEAoKCQkK\nFA4PDBAXFBgYFxQWFhodJR8aGyMcFhYgLCAjJicpKikZHy0wLSgwJSgpKP/b\nAEMBBwcHCggKEwoKEygaFhooKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgo\nKCgoKCgoKCgoKCgoKCgoKCgoKCgoKP/CABEIAJYAlgMBIgACEQEDEQH/xAAb\nAAABBQEBAAAAAAAAAAAAAAADAAIEBQYBB//EABkBAAMBAQEAAAAAAAAAAAAA\nAAECAwAEBf/aAAwDAQACEAMQAAABlF6W/PwjiDMcR2IukrtpizkIHY8zelw4\n0+dIuR5Ue2qHlW7adDR08ozJR5GkG7lNbQ44KutXTrTsnwivLmpYR6/kOJ1q\n+bUyHBrcU4NwknSYWOVayCxy7GTI2GOPTWXP1jzm5yBWALT0VJXFiYdJ6yT5\n6k26pc2E7YICzSSxTFpJI7tpnBxhs4+NZ8/VYUtlXoxs3qobLcUeoounkrua\nFxGRHr6PCyQkrxnZRzT1L8q7bUuyvdp0/OjnXTV1VpUe2Lx0enKSa6P6Pj2Q\na94M8MIs6vTFsx094avfYnDU8d4urgYORxX7p81tubuLw+bj0ULer0fF6zvD\npVhS3cbsUlc3ZXMgxqT11pn+7Urerq4nPjSgRyY/StxUc4D1dTIwRAJYsqKX\nByYo3DHc07RjqrNhFLZ2065eF6RgSsbrSX5OM53Zr2IN0T7ydq/urzEr1qGq\nR40jDnW9XbqVYVj531FBZBnfLOC7t8snGoq3rmBuWtROl0XlDNq5WGuq3M9i\nREuSkGUZJWtyJR6sq5Lq4epIr1JbMlpTsaEkCkk8/wD/xAApEAACAgIBAwQB\nBQEBAAAAAAABAgADBBESBRAxExQhIkEgIzIzQjRD/9oACAEBAAEFAgIBAJqa\nmpqampqampqampqEQiEQQQCamu92ZRVH6xQIvWftR1etijK6nxlZXpk9Qae/\nae+ae8cmglkEEHfquTZRZfmX39t9+n5r49puWyjJPJuJnEziYo02N/UIIO/U\ncb3LWYbJYMXcvp9Oa7GdHuLUf+tWMpU4qz2yzNoCTF/qEEHc+H+1lYmdXtWX\n549uiD9wjV2M68C6Qus6iylMT+oGAwGA9stiMay9lbHuDS1d1cedlWGON1ZR\n+i1ccW4fb13We4snr2RrGaYZ/bBgMBgabljBUyKgy49fyR9cagV5dy8n6j/0\nYi8MGzZsOMTDiNHoYRElA4osEEEEyazYnrcxV45zkFeofGXii2zaCtwPUDAA\nWqY5XVmgy2gAZQnuxPeT3c95PeiPo21WajW6nM2HHAVbByVsh1NdpItyG2t5\nWHJJnqkmywg/q9bRa8mK5dsar6ouh+cwhsmtjxYmfymiIvm0TU0ZxM4GEcZ5\nmpqUD7UbQIweWP6dZ+XTx5g8VNOIhAmhBqAThLG235E/3USpxGS1GrCt1DI5\nw+V8nzFMoINf1nqT1hMMhmzytWN23P8AYiOyNZnW2VifkfzM3BEbUZzsz84v\nwOoXc+5g+YPI+IfiA9v9N2EEbyT2xW+mRXyIqYwY9pj4t3FJ/poDGHbcaCV0\nWPL6/RhbvU/GVtylJlTQEFclPTyPz5Am9Qjsf44mtcvjPbdndZSNAni9Tytp\n1VfvvsZ5HyJuEyhtTn8ZB3Z3rH2Es8VNKmnUPtjg9t/o/Nc5fDfJmuyd1OjU\n8yW3UP0AwmDysY/Xt//EACIRAAICAgICAwEBAAAAAAAAAAABAhEDEBIhEzEE\nIkFRQv/aAAgBAwEBPwGiiijiyiiiiiihIjBv0NVpI8R4qGiiijE16M0eyWNx\nVvXmQ8qZx2qEk30Soyq4lHCJwWrLHKvZDKhPmflDyyxv+iz37LvXFnBjfJik\nfGkn1+mXIscbY3ZR8dfbieI8jJ5foxIkh2naJSlP3qKLp2Xpq+mR+PFmbBwj\n0P8ApVPrWLHy6J4IwV7RjkZFygOJQuzF0ZZWtoR/ndESev/EACIRAAICAgIC\nAgMAAAAAAAAAAAABAhEDEBIhEzEgQRQiUf/aAAgBAgEBPwGyyyyyyyyyyyyx\nyr2J3qzznmvov4TMcuiM0z2fjiwV2WVttpEbMb7PRzZyerLO2Sgxrifdigpo\neL+Fa5I5oS4oozJrshDm6F0WZn1Z5Txojj/ZDFpRUfWme1RWroeVox5eT71e\npyojllJ7ZJEOpF7mQW3r7+DI6//EACwQAAEDAgYBAwIHAAAAAAAAAAEAAhEg\nIQMQEjAxUUEicYEjQDIzQlJhYpH/2gAIAQEABj8C+69eI32F16GuK9TLKHth\nS0yK5NQdh6h4uLFevEMdCkeW9LWwyDnxkEKg0mGgSiJsrU4mF4F1GXC4UhCq\n6c7s5CjFPjTnyuVavE0iTCsPT2oNiney0t5X1Q6/keEWnkLEf+4oqxXK5VzW\nSV0r5TPalo48r4WGP603rGh0EdqHQMoWqV+KQmHjwVAU0W2C0E6eQtM5Q1Qi\nByoJUlRtcq2V6Hx2rHavTa4yJKlHIfwr8VcI5RkCOQteHz+pqDx8rQ1BHI5X\npcRybVasN2krTaexQa5TG9XqhWoOxqBVgrMK/KdtWb/qbJudl7c4UFWpFXvm\n3E+PsztHZd7bn//EACUQAAICAgICAwACAwAAAAAAAAABESExQRBRYXEggaEw\nkcHR4f/aAAgBAQABPyHkBBfwgBhh/AAgnAghWCjdrsl+Ciz8qDCSuyyiRrzV\ni0szaKMx8Sk6DH0sfSxKFYgAgggkQSKqyAXQ76i/DY24vRmNlOQgo7SJPweA\n84fWxkr4gLhjGaM0Mb/kMQMhKHYTa4MpGFdmZtsW3BDDM1SPiAhCpvpljtzs\nYqCeJYLow0Pekg/7ESeTZ8QiLUHlPiAJjsdpLIseh2Gf4hBshMpEtoiYDxZQ\nyPkEo9S9IgBNNAzsMEpin8VRHCCirJXlJLAqDW0JcNOhqWcpIgkarpQcX1Gy\nuGUGeDMVhDGVJAyxTKke4WQxC+AyGFYlyaSmJrwTt9iZDrgPFG1JLkmJ0KTX\noEodSUIoXZZIKmh1pgTohRTYosnkITkSzka9i3MaX90OiDlZd1MocSN+ehR/\nQ9wwpjc1ThyP30MXg4bdiSz2ZMJvhc4yiO3HyaotVuSZW2rHRSWqGk0hFZE8\nGZslJDpxKYvJQrg4GNqhN0LqF1i6SB20Nwl/YzuiWMSnZHP/AExhWTrOqHsb\nbP0D/wChrtsITgIcIY0LgFN0mKmRPtCcexlL6GvwZS6UVI/AyiFaEhfcYXFa\nEesGF7Fi8iNK1Q47IJEDLMdJA+yRiwe0yKFJjTkWnO1E8pBTlvfY8SjGKEoM\n/QxGkbIauKtaDrPZxEk0jA/BnXaGlIl4OFu0OkfBvjR8FRsS4iW2Xo2yZxi7\nNpXoelIqHckVkFoTH2LXsuZ5jug1IT6NFg3wzDjpVPQiRiKEqZXpmxoMmwpg\n3DKkaw6JSkiYL0h8pZcHpbFi4Y1t24JwLKlH9xLBDEiIuGf8EDIJkIpG9ZXD\nUhPRvgkQmBtPJC1I8Ro4GlcWEmmLsQ7UMY9dMekiLeXCeJIOBJFeFIj/2gAM\nAwEAAgADAAAAEFf+JOlkU+8Gd+NvwiETg1rOWnTJaqPHLDZDLPxeQb0chO9s\nip8+YCssJGsDg2OdFiOcfDM+zYfWs7bWTRb0sIdiYbvA4I/vI4PHPP/EAB8R\nAQEBAQACAwEBAQAAAAAAAAEAESExQRAgUWFx8P/aAAgBAwEBPxD6hLPPybfp\nul4VOsZNusH9kdDdPphMPCe457LM7fxhMCw9uXIa7bTwy2RfVt5/sh5fykek\nJahQ9KEbO8PEg7TEfByPoZGWj8H5Rbuvj1IW+niQVlV/7sc4eLdN49s/sUht\n5srIGXsBD69g9XDZRj1bfcEHJe3YNltwkHpMHt7LL2U2xeVg5Ehei0c/Jexd\nNLILIbxnjKqn4xvx6z4//8QAHREBAQEAAgMBAQAAAAAAAAAAAQARITEQQVEg\nYf/aAAgBAgEBPxD8Bn7Af2QwuyAaQ83A2R8gPhHC222Km3uepFCDpKfci5XC\n1YyOcWQbAT7YElRH0lLLUqOglOQHmFMIA9aSHbZQ4+H6T9YACdXGDiYRDgEz\nEk6tfPAP8pT3iATHpm8GSy5sNFj54OwvXSZQ5MnRzal28sF0WeWhLJiaMmdN\nzLNW2S7z1YYjxv4v/8QAJxABAAICAgEDAwUBAAAAAAAAAQARITFBUWFxgZGh\nsdEQIMHh8fD/2gAIAQEAAT8Q1zX+r+GHjCfRPRK9Ssr1Hx/cuuWeP9qQFnkb\nigVoDK9Qdr/5BaMii4RB9Y6lUoyJ3XMDmVoenhmvPyXKs6C49tPARWou1F8a\nu5vcLBLOf2wRD3mq27gvdbgPvI+cpfvMnX6svVmLaw5hx1KNch8G27hQkfUN\nkRe6US28/iP9BAfiiQKzzMvR/ZjqBOzB93B/UpWBxfDi/MU2K8rK5VZt5lAJ\nrXcrYksAmNalta0EDmCDhK+kImnxFYp8SjUXM/Qjj1HHFOKH4DP8QcbWXq2O\nFtK8Tm0bhUGC49YJXBstEOLcPswCsBDSJslBKRbT5lPBbJ7RgQ4XcD9OypoD\ndHad0XAsBVYXn0QyB04P1hJGxPiLgMtPAyyHSggHisvNPE3GtJp6TwmYp9E7\neR38rGQYZjzDHf0jt/RFEBcxV8R03PNEiXuNjMWuiz58HmcwpQizdEeEdS7l\nsZBUIrVOCyyOljK7o30CBRwPkErNSI9Uv+Yz3nUSpRgbYI/tVyxSxnuagTIj\nO5TuINoHcWR4GkVkMwxpsCdMDBCWMUowqviWJYJay3sfiEKMKhDBevMBxHHV\ns17QEwcr4CiIVUC0hC8wK1yFxI6KiO4XhUMeZoiUOsB7P0YN0+YgAK5zFAEt\nT2TX3zONHT3KudtzjH+QplGVo3uCYvGQVHfFiXDxBYsBwhAKOQyTKSpm7c7h\nXI7uATu4xVZnYYL2xt7lvcLeWIZlVeXPxMtxBV8sJGxAq/hlohpLoNh6RWhn\nqBeTTiJ9cQrxz8x0MKgdxzVot4iigw7HrFiiwuzUtZJcZjSU9ovTiHeJ5xUc\nGYfzGbJxGfW+pmsZMzj+YfeY1DprMZRWkr7s8lig1rH3joDiGZmzSMA2D2gU\nrWzqGRgYpm8obfiClZleQ+CIWTDKpEB2cHjiDk1t+Zv9T8JQisLIi9L8lcQW\nwpS/8ejCYGG2ApHwdTXaGGimQ9rQwPb8RRu30jNk1ZjTI+YRMZi4ZvtlQgR6\n/wDS42cblE6PPECmwL/viOT4SND2OC7Ta78MEr/gs9NEYY2nPJn18NHsuIta\nigOX/I7twKI/qXTLDKUPMWxnmbH5mFQQ8uD+Y9kULrP3jVdxiN9cz8Yl7odS\nsqbbISeYChmo8LiDNJa0OCIACOjmDImTmXRfMHJySxvzTBRxAhQeIzmfAfmD\nWBa0/MoG1mIspioMU3sgD7J4XLWK4ylSlpGYV4FXgLgwnfgfWCyM2DFPvHUx\nEz+m3YlrLfidiKoYJBJrJVQzKY/3PzG7p6ipQ5HTG4nuUOw6jhHvMNWeGX/5\nlRtV1PMA/LNokrMwAgktxsLgp68yjJiX1UoJjT+SZal6FyBzEK3WFUsXNVmX\nHYzaJ1s9CAjIxGzqUxlADqVTub9uZhKY2RhWqU1fJmWcz1TidEqrGHYYiDcj\ndjGBUUO3AS0eVjmJOMSg4hmFXG9soliOGXB4LmxHuY6T8UWMQm7lolhBIugj\nMrrETyiX6qPe4jqf/9k=\n"
  src = "data:image/jpg;base64, /9j/4AAQSkZJRgABAQAAAQABAAD/7QCEUGhvdG9zaG9wIDMuMAA4QklNBAQA\nAAAAAGgcAigAYkZCTUQwYTAwMGE2ZjAxMDAwMDQ4MDMwMDAwZDEwNTAwMDA5\nYTA2MDAwMDQ5MDcwMDAwNzQwODAwMDAwZjBiMDAwMDg5MGIwMDAwNGYwYzAw\nMDAwYTBkMDAwMDc1MTEwMDAwAP/bAEMABgQFBgUEBgYFBgcHBggKEAoKCQkK\nFA4PDBAXFBgYFxQWFhodJR8aGyMcFhYgLCAjJicpKikZHy0wLSgwJSgpKP/b\nAEMBBwcHCggKEwoKEygaFhooKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgo\nKCgoKCgoKCgoKCgoKCgoKCgoKCgoKP/CABEIAJYAlgMBIgACEQEDEQH/xAAb\nAAABBQEBAAAAAAAAAAAAAAADAAIEBQYBB//EABkBAAMBAQEAAAAAAAAAAAAA\nAAECAwAEBf/aAAwDAQACEAMQAAABlF6W/PwjiDMcR2IukrtpizkIHY8zelw4\n0+dIuR5Ue2qHlW7adDR08ozJR5GkG7lNbQ44KutXTrTsnwivLmpYR6/kOJ1q\n+bUyHBrcU4NwknSYWOVayCxy7GTI2GOPTWXP1jzm5yBWALT0VJXFiYdJ6yT5\n6k26pc2E7YICzSSxTFpJI7tpnBxhs4+NZ8/VYUtlXoxs3qobLcUeoounkrua\nFxGRHr6PCyQkrxnZRzT1L8q7bUuyvdp0/OjnXTV1VpUe2Lx0enKSa6P6Pj2Q\na94M8MIs6vTFsx094avfYnDU8d4urgYORxX7p81tubuLw+bj0ULer0fF6zvD\npVhS3cbsUlc3ZXMgxqT11pn+7Urerq4nPjSgRyY/StxUc4D1dTIwRAJYsqKX\nByYo3DHc07RjqrNhFLZ2065eF6RgSsbrSX5OM53Zr2IN0T7ydq/urzEr1qGq\nR40jDnW9XbqVYVj531FBZBnfLOC7t8snGoq3rmBuWtROl0XlDNq5WGuq3M9i\nREuSkGUZJWtyJR6sq5Lq4epIr1JbMlpTsaEkCkk8/wD/xAApEAACAgIBAwQB\nBQEBAAAAAAABAgADBBESBRAxExQhIkEgIzIzQjRD/9oACAEBAAEFAgIBAJqa\nmpqampqampqampqEQiEQQQCamu92ZRVH6xQIvWftR1etijK6nxlZXpk9Qae/\nae+ae8cmglkEEHfquTZRZfmX39t9+n5r49puWyjJPJuJnEziYo02N/UIIO/U\ncb3LWYbJYMXcvp9Oa7GdHuLUf+tWMpU4qz2yzNoCTF/qEEHc+H+1lYmdXtWX\n549uiD9wjV2M68C6Qus6iylMT+oGAwGA9stiMay9lbHuDS1d1cedlWGON1ZR\n+i1ccW4fb13We4snr2RrGaYZ/bBgMBgabljBUyKgy49fyR9cagV5dy8n6j/0\nYi8MGzZsOMTDiNHoYRElA4osEEEEyazYnrcxV45zkFeofGXii2zaCtwPUDAA\nWqY5XVmgy2gAZQnuxPeT3c95PeiPo21WajW6nM2HHAVbByVsh1NdpItyG2t5\nWHJJnqkmywg/q9bRa8mK5dsar6ouh+cwhsmtjxYmfymiIvm0TU0ZxM4GEcZ5\nmpqUD7UbQIweWP6dZ+XTx5g8VNOIhAmhBqAThLG235E/3USpxGS1GrCt1DI5\nw+V8nzFMoINf1nqT1hMMhmzytWN23P8AYiOyNZnW2VifkfzM3BEbUZzsz84v\nwOoXc+5g+YPI+IfiA9v9N2EEbyT2xW+mRXyIqYwY9pj4t3FJ/poDGHbcaCV0\nWPL6/RhbvU/GVtylJlTQEFclPTyPz5Am9Qjsf44mtcvjPbdndZSNAni9Tytp\n1VfvvsZ5HyJuEyhtTn8ZB3Z3rH2Es8VNKmnUPtjg9t/o/Nc5fDfJmuyd1OjU\n8yW3UP0AwmDysY/Xt//EACIRAAICAgICAwEBAAAAAAAAAAABAhEDEBIhEzEE\nIkFRQv/aAAgBAwEBPwGiiijiyiiiiiihIjBv0NVpI8R4qGiiijE16M0eyWNx\nVvXmQ8qZx2qEk30Soyq4lHCJwWrLHKvZDKhPmflDyyxv+iz37LvXFnBjfJik\nfGkn1+mXIscbY3ZR8dfbieI8jJ5foxIkh2naJSlP3qKLp2Xpq+mR+PFmbBwj\n0P8ApVPrWLHy6J4IwV7RjkZFygOJQuzF0ZZWtoR/ndESev/EACIRAAICAgIC\nAgMAAAAAAAAAAAABAhEDEBIhEzEgQRQiUf/aAAgBAgEBPwGyyyyyyyyyyyyx\nyr2J3qzznmvov4TMcuiM0z2fjiwV2WVttpEbMb7PRzZyerLO2Sgxrifdigpo\neL+Fa5I5oS4oozJrshDm6F0WZn1Z5Txojj/ZDFpRUfWme1RWroeVox5eT71e\npyojllJ7ZJEOpF7mQW3r7+DI6//EACwQAAEDAgYBAwIHAAAAAAAAAAEAAhEg\nIQMQEjAxUUEicYEjQDIzQlJhYpH/2gAIAQEABj8C+69eI32F16GuK9TLKHth\nS0yK5NQdh6h4uLFevEMdCkeW9LWwyDnxkEKg0mGgSiJsrU4mF4F1GXC4UhCq\n6c7s5CjFPjTnyuVavE0iTCsPT2oNiney0t5X1Q6/keEWnkLEf+4oqxXK5VzW\nSV0r5TPalo48r4WGP603rGh0EdqHQMoWqV+KQmHjwVAU0W2C0E6eQtM5Q1Qi\nByoJUlRtcq2V6Hx2rHavTa4yJKlHIfwr8VcI5RkCOQteHz+pqDx8rQ1BHI5X\npcRybVasN2krTaexQa5TG9XqhWoOxqBVgrMK/KdtWb/qbJudl7c4UFWpFXvm\n3E+PsztHZd7bn//EACUQAAICAgICAwACAwAAAAAAAAABESExQRBRYXEggaEw\nkcHR4f/aAAgBAQABPyHkBBfwgBhh/AAgnAghWCjdrsl+Ciz8qDCSuyyiRrzV\ni0szaKMx8Sk6DH0sfSxKFYgAgggkQSKqyAXQ76i/DY24vRmNlOQgo7SJPweA\n84fWxkr4gLhjGaM0Mb/kMQMhKHYTa4MpGFdmZtsW3BDDM1SPiAhCpvpljtzs\nYqCeJYLow0Pekg/7ESeTZ8QiLUHlPiAJjsdpLIseh2Gf4hBshMpEtoiYDxZQ\nyPkEo9S9IgBNNAzsMEpin8VRHCCirJXlJLAqDW0JcNOhqWcpIgkarpQcX1Gy\nuGUGeDMVhDGVJAyxTKke4WQxC+AyGFYlyaSmJrwTt9iZDrgPFG1JLkmJ0KTX\noEodSUIoXZZIKmh1pgTohRTYosnkITkSzka9i3MaX90OiDlZd1MocSN+ehR/\nQ9wwpjc1ThyP30MXg4bdiSz2ZMJvhc4yiO3HyaotVuSZW2rHRSWqGk0hFZE8\nGZslJDpxKYvJQrg4GNqhN0LqF1i6SB20Nwl/YzuiWMSnZHP/AExhWTrOqHsb\nbP0D/wChrtsITgIcIY0LgFN0mKmRPtCcexlL6GvwZS6UVI/AyiFaEhfcYXFa\nEesGF7Fi8iNK1Q47IJEDLMdJA+yRiwe0yKFJjTkWnO1E8pBTlvfY8SjGKEoM\n/QxGkbIauKtaDrPZxEk0jA/BnXaGlIl4OFu0OkfBvjR8FRsS4iW2Xo2yZxi7\nNpXoelIqHckVkFoTH2LXsuZ5jug1IT6NFg3wzDjpVPQiRiKEqZXpmxoMmwpg\n3DKkaw6JSkiYL0h8pZcHpbFi4Y1t24JwLKlH9xLBDEiIuGf8EDIJkIpG9ZXD\nUhPRvgkQmBtPJC1I8Ro4GlcWEmmLsQ7UMY9dMekiLeXCeJIOBJFeFIj/2gAM\nAwEAAgADAAAAEFf+JOlkU+8Gd+NvwiETg1rOWnTJaqPHLDZDLPxeQb0chO9s\nip8+YCssJGsDg2OdFiOcfDM+zYfWs7bWTRb0sIdiYbvA4I/vI4PHPP/EAB8R\nAQEBAQACAwEBAQAAAAAAAAEAESExQRAgUWFx8P/aAAgBAwEBPxD6hLPPybfp\nul4VOsZNusH9kdDdPphMPCe457LM7fxhMCw9uXIa7bTwy2RfVt5/sh5fykek\nJahQ9KEbO8PEg7TEfByPoZGWj8H5Rbuvj1IW+niQVlV/7sc4eLdN49s/sUht\n5srIGXsBD69g9XDZRj1bfcEHJe3YNltwkHpMHt7LL2U2xeVg5Ehei0c/Jexd\nNLILIbxnjKqn4xvx6z4//8QAHREBAQEAAgMBAQAAAAAAAAAAAQARITEQQVEg\nYf/aAAgBAgEBPxD8Bn7Af2QwuyAaQ83A2R8gPhHC222Km3uepFCDpKfci5XC\n1YyOcWQbAT7YElRH0lLLUqOglOQHmFMIA9aSHbZQ4+H6T9YACdXGDiYRDgEz\nEk6tfPAP8pT3iATHpm8GSy5sNFj54OwvXSZQ5MnRzal28sF0WeWhLJiaMmdN\nzLNW2S7z1YYjxv4v/8QAJxABAAICAgEDAwUBAAAAAAAAAQARITFBUWFxgZGh\nsdEQIMHh8fD/2gAIAQEAAT8Q1zX+r+GHjCfRPRK9Ssr1Hx/cuuWeP9qQFnkb\nigVoDK9Qdr/5BaMii4RB9Y6lUoyJ3XMDmVoenhmvPyXKs6C49tPARWou1F8a\nu5vcLBLOf2wRD3mq27gvdbgPvI+cpfvMnX6svVmLaw5hx1KNch8G27hQkfUN\nkRe6US28/iP9BAfiiQKzzMvR/ZjqBOzB93B/UpWBxfDi/MU2K8rK5VZt5lAJ\nrXcrYksAmNalta0EDmCDhK+kImnxFYp8SjUXM/Qjj1HHFOKH4DP8QcbWXq2O\nFtK8Tm0bhUGC49YJXBstEOLcPswCsBDSJslBKRbT5lPBbJ7RgQ4XcD9OypoD\ndHad0XAsBVYXn0QyB04P1hJGxPiLgMtPAyyHSggHisvNPE3GtJp6TwmYp9E7\neR38rGQYZjzDHf0jt/RFEBcxV8R03PNEiXuNjMWuiz58HmcwpQizdEeEdS7l\nsZBUIrVOCyyOljK7o30CBRwPkErNSI9Uv+Yz3nUSpRgbYI/tVyxSxnuagTIj\nO5TuINoHcWR4GkVkMwxpsCdMDBCWMUowqviWJYJay3sfiEKMKhDBevMBxHHV\ns17QEwcr4CiIVUC0hC8wK1yFxI6KiO4XhUMeZoiUOsB7P0YN0+YgAK5zFAEt\nT2TX3zONHT3KudtzjH+QplGVo3uCYvGQVHfFiXDxBYsBwhAKOQyTKSpm7c7h\nXI7uATu4xVZnYYL2xt7lvcLeWIZlVeXPxMtxBV8sJGxAq/hlohpLoNh6RWhn\nqBeTTiJ9cQrxz8x0MKgdxzVot4iigw7HrFiiwuzUtZJcZjSU9ovTiHeJ5xUc\nGYfzGbJxGfW+pmsZMzj+YfeY1DprMZRWkr7s8lig1rH3joDiGZmzSMA2D2gU\nrWzqGRgYpm8obfiClZleQ+CIWTDKpEB2cHjiDk1t+Zv9T8JQisLIi9L8lcQW\nwpS/8ejCYGG2ApHwdTXaGGimQ9rQwPb8RRu30jNk1ZjTI+YRMZi4ZvtlQgR6\n/wDS42cblE6PPECmwL/viOT4SND2OC7Ta78MEr/gs9NEYY2nPJn18NHsuIta\nigOX/I7twKI/qXTLDKUPMWxnmbH5mFQQ8uD+Y9kULrP3jVdxiN9cz8Yl7odS\nsqbbISeYChmo8LiDNJa0OCIACOjmDImTmXRfMHJySxvzTBRxAhQeIzmfAfmD\nWBa0/MoG1mIspioMU3sgD7J4XLWK4ylSlpGYV4FXgLgwnfgfWCyM2DFPvHUx\nEz+m3YlrLfidiKoYJBJrJVQzKY/3PzG7p6ipQ5HTG4nuUOw6jhHvMNWeGX/5\nlRtV1PMA/LNokrMwAgktxsLgp68yjJiX1UoJjT+SZal6FyBzEK3WFUsXNVmX\nHYzaJ1s9CAjIxGzqUxlADqVTub9uZhKY2RhWqU1fJmWcz1TidEqrGHYYiDcj\ndjGBUUO3AS0eVjmJOMSg4hmFXG9soliOGXB4LmxHuY6T8UWMQm7lolhBIugj\nMrrETyiX6qPe4jqf/9k=\n"

  constructor(
    public translate: TranslateService,
    private router: Router,
    private renderer: Renderer2,
    private pagesService: PagesService,
    private sanitization: DomSanitizer
  ) { }

  ngOnInit(): void {
    if (this.page.youtube) {
      this.background = `https://img.youtube.com/vi/${this.getYoutubeId(this.page.youtube)}/0.jpg`;
    } else {
      this.background = this.baseUrl + this.page.background;
    }
    this.switchActive = this.page.status === 'active';
    this.src = `data:image/jpg;base64, ${this.page.instaAvatar}`;
  }

  ngAfterViewInit(): void {
    this.renderer.setStyle(this.picture.nativeElement, 'height', `${this.card.nativeElement.offsetWidth * 2 / 3}px`);
  }

  getYoutubeId(url): string {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length === 11) {
      return match[2];
    }
    return '';
  }

  toggleFullMode(): void {
    this.fullMode = !this.fullMode;
  }

  handleCancel(): void {
    this.isVisibleMenu = false;
  }

  showMenu(): void {
    this.isVisibleMenu = true;
  }

  setStatus(): void {
    const status = this.switchActive ? 'active' : 'inactive';
    const formData: any = new FormData();
    formData.append('status', status);
    // formData.append('status', property.status ? 'active' : 'inactive');
    this.pagesService.updatePage(this.page.id, formData).subscribe(res => {
      this.page.status = res.status;
      // this.router.navigate(['/']);
    });
  }

  // getInstaAvatar = (): void => {
  //   fetch(`https://www.instagram.com/${this.page.instagramLogin}/?__a=1`).then(res =>
  //     res.json().then(resp => {
  //       console.log(resp);
  //     }));
  // }
  // https://www.instagram.com/user/?__a=1

  goToInfo(tab: string): void {
    this.router.navigate(['/subscribe-pages', this.page.id], { queryParams: { tab } });
  }

}
