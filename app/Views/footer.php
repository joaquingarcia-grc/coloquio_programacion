    <div id="mensaje" class="alert d-none"></div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="https://cdn.datatables.net/2.1.8/js/dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/2.1.8/js/dataTables.bootstrap5.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/3.2.0/js/dataTables.buttons.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/3.2.0/js/buttons.bootstrap5.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/pdfmake.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/vfs_fonts.js"></script>
    <script src="https://cdn.datatables.net/buttons/3.2.0/js/buttons.html5.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/3.2.0/js/buttons.print.min.js"></script>
    <script>
        const BASE = "<?php echo base_url();?>";
        const VEMP = <?= json_encode($empleados) ?>;
        const USR = <?= json_encode(session()->get('denominacion')); ?>;
    </script>
    <script src='<?php echo base_url();?>js/liquidaciones.js'></script>
    <script src='<?php echo base_url();?>js/empleados.js'></script>
    <script src='<?php echo base_url();?>js/calendario.js'></script>
    <script src='<?php echo base_url();?>js/script.js'></script>
    <script src="<?php echo base_url();?>js/login.js"></script>
    <script src='<?php echo base_url();?>js/reporte.js'></script>
    <script src='<?php echo base_url();?>js/calculadora.js'></script>
    <script src='<?php echo base_url();?>js/actividad.js'></script>

</body>
</html>