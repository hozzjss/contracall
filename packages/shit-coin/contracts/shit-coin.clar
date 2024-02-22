;; title: shit-coin
;; version:
;; summary:
;; description:

;; traits
;;
(impl-trait 'SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE.sip-010-trait-ft-standard.sip-010-trait)

;; token definitions
;;
(define-fungible-token token-name SUPPLY)
;; constants
;;
(define-constant MAX-MINT u0003)
(define-constant SUPPLY u0007)
;; data vars
;;

;; data maps
;;

;; public functions
;;
(define-public (transfer (amount uint) (sender principal) (recipient principal) (memo (optional (buff 34)))) 
    (begin 
        (asserts! (is-eq tx-sender sender) (err u1001))
        (asserts! (>= (ft-get-balance token-name sender) amount) (err u1002))
        (asserts! (not (is-eq sender recipient)) (err u1003))
        (match memo to-print (print to-print) 0x)
        (ft-transfer? token-name amount sender recipient))
)

(define-public (burn (amount uint)) 
    (begin 
        (asserts! (is-eq contract-caller tx-sender) (err u1004))
        (asserts!  (>= (ft-get-balance token-name tx-sender) amount) (err u1002))
        (ft-burn? token-name amount tx-sender)
    ))

(define-public (mint (amount uint)) 
    (begin 
        (asserts! (is-eq contract-caller tx-sender) (err u1004))
        ;; if yer a kentrekt then ye kant ment
        (asserts! (is-none (get name (unwrap-panic (principal-destruct? tx-sender)))) (err u1005))
        (asserts! (<= (ft-get-supply token-name) SUPPLY) (err u1007))
        (asserts! (<= amount MAX-MINT) (err u1006))
        (ft-mint? token-name amount tx-sender)
    ))
;; read only functions
;;
(define-read-only (get-balance (address principal)) 
    (ok (ft-get-balance token-name address)))

(define-read-only (get-decimals) 
    (ok u0002))
(define-read-only (get-name) 
    (ok "Token Name"))

(define-read-only (get-symbol) 
    (ok "TKN"))

(define-read-only (get-token-uri) 
    (ok (some u"ipfs://token.name")))

(define-read-only (get-total-supply) 
    (ok (ft-get-supply token-name)))
;; private functions    
;;

